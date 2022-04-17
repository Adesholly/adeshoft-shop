import path from "path"
import express from "express"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },

  filename: function (req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`
    cb(null, fileName)
  },
})

//Checking the file type
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extensionName = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = filetypes.test(file.mimetype)

  if (extensionName && mimetype) {
    return cb(null, true)
  } else cb("Images Only!!!")
}

const upload = multer({
  storage,

  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
