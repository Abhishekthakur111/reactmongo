const cms = require("../../models/cms");

module.exports ={
    privacy_policy:async (req,res) =>{
        try {
            let data = await cms.findOne({type :1});
            return res.status(200).json({message:"privacy policy....",data});
        } catch (error) {
            console.log(error);
            return res.status(500).json({messgae:"Internal server error"});
        }
    },
    privacypolicy: async (req, res) => {
        try {
            const { title, content } = req.body;
            let data = await cms.findOneAndUpdate(
                { type: '1' }, 
                { title, content },
                { new: true, upsert: true }
            );
            return res.status(200).json({ message: "Privacy policy updated successfully.", data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
    aboutus:async(req, res) => {
        try {
            let data = await cms.findOne({type:2});
            return res.status(200).json({message:"about us..", data});
        } catch (error) {
            console.log(error);
            return res.status(500).json({messgae:"Internal server error"});
        }
    },
    updateabout:async(req,res) => {
        try {
            const {title , content} = req.body;
            let data = await cms.findOneAndUpdate({type:2},
                {title, content},
                {new: true, upsert:true}
            );
            return res.status(200).json({message:" update about us sucessfully.", data});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Internal server error"});
        }

    },
    term:async(req,res)=>{
        try {
            let data = await cms.findOne({type:3});
            return res.status(200).json({message:"Term and Condtions.....", data});            
        } catch (error) {
            console.log(error);
            return res.status(500).json({messgae:"Internal server error"});
        }
    },
    updateterm:async(req,res)=> {
        try {
            const {title, content} = req.body;
            let data = await cms.findOneAndUpdate({type:3},
                {title, content},
                {new:true, upsert:true},
            );
            return res.status(200).json({message:'Term and conditions......', data});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"internal server error"})
        }
    }
}