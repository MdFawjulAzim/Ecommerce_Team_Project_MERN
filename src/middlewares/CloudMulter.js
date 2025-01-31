import multer from 'multer'

const memoryStorage = multer.memoryStorage()

const cloudUpload = multer({ storage : memoryStorage })

export default cloudUpload