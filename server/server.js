
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    }, 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '-' + file.originalname)
    }
}); 

const port = 3000



const upload = multer({storage}).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})



app.listen(3000, () => {
    console.log(`App is listening on ${port}`)
})