const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verification = require('../midle-wear/verificatio');
const upload = require('../midle-wear/multer');
const cloudinary = require('../utils/cloudinary-config/config-cloudinary');
const user = require('../models/User');

//Single Photo upload/delete
router.post('/uploadphoto',verification, upload.single('photo'), async(req,res)=>{
 
    try{
   
    const user = await User.findById(req.user.id)
    if(!user){return res.status(404).json({msg:'User Not Found'})}
    //puraton photo delete
    if(user.photo?.public_id){await cloudinary.uploader.destroy(user.photo.public_id);}
    //notun photo add
    const result = await cloudinary.uploader.upload(req.file.path);
    //DB te photo save
    user.photo={
        url:result.secure_url,
        public_id:result.public_id
    };
    await user.save();
    //local path clear:
    const fs=require('fs');
    fs.unlink(req.file.path, (err)=>{if(err)console.error(err);})
    res.status(200).json({msg:'Photo uploaded successfully'})
    }catch(error){console.error(error.message);res.status(500).json({msg:'Server Error'})}

});
// Multipul Photo Upload
router.post('/uploadphotos',upload.array('photos',5),verification, async(req,res)=>{
    const files = req.files;
    const user = await User.findById(req.user.id);
    if(!user){return res.status(404).json({msg:'User Not Found'})};
    const uploadesPhotos = [];
    try{
        for(const file of files){ const  result = await  cloudinary.uploader.upload(file.path);
            uploadesPhotos.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        const fs=require('fs/promises');
      try{
        await fs.unlink(file.path);
      }catch(error){console.warn('File not found or already deleted');
      }
        };
        user.photos = [...user.photos,...uploadesPhotos] //agger sob photo er sathe new photo add hobe
        //user.photos = uploadesPhotos agger gulo replace hoye notun gulo add hobe. er jonno cloudnariy thekeo delete kore dite hobe.
        await user.save();
        res.status(200).json({msg:'All Photo Uploaded'})
    }catch(error){console.error(error);
        res.status(500).json({msg:'Server Error'})
    }
});

//All Photo Delete/full object delete delete
router.delete('/deleteallphoto',verification, async(req,res)=>{
    const user= await User.findById(req.user.id);
    if(!user){return res.status(404).json({msg:'User Not Found'})};
    try{
    if(user.photos && user.photos.length>0){
        for(const photo of user.photos){
            await cloudinary.uploader.destroy(photo.public_id)
        };
    };

    user.photos=[];
   await user.save();
  res.status(200).json({msg:'Photo Deleted'})
  
    //user.findbyIdandDelete(req.params.id)
    }catch(error){console.error(error)}
});



//Individual Photo Delete
//Note: Jodi User Schema theke photo upload kora hoy tahole userId dorkar nai karon token verification kore user detect koreb.
// jodi onno schema theke photo upload hoi jemon product or any thing tahole oi schema er Id lagbe perameter e jemon ProductId=req.params
//ar publicId sob gulo te lagbe karon oitai amra delete korbo publicId=req.params
//route hobe product schema thakle '/deletesinglephoto/:productId/:publicId'
router.delete('/deletesinglephoto/:publicId',verification,async(req,res)=>{
        const user = await User.findById(req.user.id)
        const {publicId}=req.params
    if(!user){return res.status(404).json({msg:'User Not Found'})};
    try{
    if(user.photos && user.photos.length>0){
      await cloudinary.uploader.destroy(publicId)
    }
    user.photos= user.photos.filter((photo)=> photo.public_id !== publicId);
    await user.save()
    res.status(200).json({msg: 'Photo Deleted'})

    }catch(error){console.error(error)}
});




module.exports= router


//Multuple Photo upload process: multiple photos upload korle Schema te photos:[{

//  }] korte hoeb.

// router.post('/uploadphoto',verification,upload.array('photos' 5), async(req,res)=>{
//     try{
//      5 diye photo upload limit kore deya hoi
//      const files = req.files
//     const user = await User.findById(req.user.id)
//     if(!user){return res.status(404).json({msg:'User Not Found'})}
//     //puraton photo delete
//     if(user.phots && user.photos.legnth>0){
//          for (const photo of user.photos){await clodinary.uploader.destroy(photo.public_id)}}
//     //notun photo add
//     const uploadedPhotos = []
//for(const file of files){const result= await clodinary.uploader.upload(file.path)

//DB te save
//      uploadedPhotos.push({
//          url:result.secure_url,
//         public_id:result.public_id

//          })}
//      user.photos = uploadedPhots
//     await user.save();
//     res.status(200).json({success:true, msg:'Photo uploaded successfully'})
//     }catch(error){console.error(error.message);res.status(500).json({msg:'Server Error'})}

// })

