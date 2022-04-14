import express from "express"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, callb) {
    callb(null, "/uploads")
  },

  filename: function (req, file, callb) {
    const fileName = `${file.fieldname}-${Date.now()}.${path.extname(
      file.originalname
    )}`
    callb(null, fileName)
  },
})

//Checking the file type
function checkFileType(file, callb) {
  const filetypes = /jpg|jpeg|png/
  const extensionName = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = filetypes.test(file.mimetype)

  if (extensionName && mimetype) {
    return callb(null, true)
  } else callb("Images Only!!!")
}

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, callb) {
    checkFileType(file, callb)
  },
})

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
