const express = require('express');
const { isAdmin, generalAuthenticate } = require('../../middlewares/auth');
const FacebookApplicationSetting = require('../../models/facebook_application_setting');
const ApiResponse = require('../../utils/api_response');
const router = express.Router();

router.get('/get-setting', generalAuthenticate, async (req, res) => {
   const setting = await FacebookApplicationSetting.find({});
   if (!setting || setting.length === 0) {
      return res
         .status(200)
         .json(
            new ApiResponse(
               200,
               null,
               'No Facebook application settings found',
               true
            )
         );
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            setting,
            'Facebook application settings retrieved successfully',
            true
         )
      );
});

router.put('/update-setting', isAdmin, async (req, res) => {
   const updateData = req.body;
   const setting = await FacebookApplicationSetting.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
   );

   if (!setting) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Failed to update Facebook application settings',
               false
            )
         );
   }
   return res
      .status(200)
      .json(
         new ApiResponse(
            200,
            setting,
            'Facebook application settings updated successfully',
            true
         )
      );
});

router.post('/create-setting', isAdmin, async (req, res) => {
   const settingData = req.body;
   const newSetting = await FacebookApplicationSetting.create(settingData);

   if (!newSetting) {
      return res
         .status(400)
         .json(
            new ApiResponse(
               400,
               null,
               'Failed to create Facebook application setting',
               false
            )
         );
   }
   return res
      .status(201)
      .json(
         new ApiResponse(
            201,
            newSetting,
            'Facebook application setting created successfully',
            true
         )
      );
});

module.exports = router;
