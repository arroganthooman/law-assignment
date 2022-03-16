const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080
const urlEncodedParser = bodyParser.urlencoded({extended: false})
const jsonParser = bodyParser.json()
const multer = require('multer');
const path =  require('path');


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/uploads"));
    },
    // konfigurasi penamaan file yang unik
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

dataMahasiswa = {
    1906307132: {
        "nama": "Fikri Akmal",
        "npm": "1906307132",
        "alamat": "Jalan Rancho Indah"
    }
}


const app = express();
app.get("/mahasiswa/:npm", (req, res) => {
    const npm = req.params.npm;
    if (!dataMahasiswa[npm]) {
        return res.status(404).json({"error": "Tidak ada mahasiswa dengan npm terkait."})
    }

    return res.status(200).json(dataMahasiswa[npm])
})

app.post("/mahasiswa", jsonParser, (req, res) => {
    if (req.body.nama && req.body.alamat && req.body.npm ) {
        if (!dataMahasiswa[req.body.npm]) {
            dataMahasiswa[req.body.npm] = req.body
            return res.status(201).json(dataMahasiswa[req.body.npm])
        } else {
            return res.status(409).json({error: "Mahasiswa sudah terdaftar."})
        }
    } else {
        return res.status(422).json({error: "Data kurang lengkap"})
    }
})


app.put("/mahasiswa/:npm", jsonParser, (req, res) => {
    const body = req.body;
    const npm = req.params.npm;

    console.log(dataMahasiswa[npm])

    if (!dataMahasiswa[npm]) {
        return res.status(404).json({"error": "Mahasiswa belum terdaftar"})
    }

    let oldData = dataMahasiswa[npm];
    delete body.npm // Prevent from changing NPM
    oldData = {...oldData, ...body}
    dataMahasiswa[npm] = oldData

    return res.status(200).json(dataMahasiswa[npm])
})

app.delete("/mahasiswa/:npm", (req, res) => {
    const npm = req.params.npm;

    if (dataMahasiswa[npm]) {
        delete dataMahasiswa[npm];
        return res.status(200).json({"Status": "Sukses menghapus mahasiswa"})
    }
    
    return res.status(404).json({"error": "Mahasiswa belum terdaftar"})
})


app.post("/upload", multer({storage: diskStorage}).single("file"), (req, res) => {
    const file =  req.file.path;

    if (!file) {
      return res.status(400).send({
        status: false,
        data: "No File is selected.",
      });
    }
    return res.status(201).json({status: "OK", description: "File has been uploaded"})
})


app.listen(PORT, () => {
    console.log("App running on PORT " + PORT)
})