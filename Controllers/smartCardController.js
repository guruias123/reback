import SmartCard from "../Models/smartCardModel.js";

export const createSmartCard = async (req, res) => {
        try {
            req.body.userId = req.user._id;
            const smartCard = await new SmartCard(req.body);
            await smartCard.save();
            return res.json({success: true, msg: "Smart Card Data Updated Successfully", smartCard});
        } catch (error) {
            console.log(error);
            return res.json({success: false, msg: "something went wrong"})
        }
}

export const getAllSmartCardsByUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const smartCards = await SmartCard.find({userId})
        return res.json({success: true, msg: "User Cards Sended Successfully", smartCards})
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "something went wrong", error})
    }
}

export const getUniqueSmartCard = async (req, res) => {
    const {smartCardId} = req.params;
    try {
        const smartCard = await SmartCard.findById(smartCardId);
        if(!smartCard) return res.json({success: false, msg: "Resume Not Found"})
        return res.json({success: true, msg: "Resume data sended successfully", smartCard});
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "something went wrong", error})
    }
}

export const updateSmartCard = async (req, res) => {
    const {smartCardId} = req.params;
    try {
        console.log(req.body);
        const smartCardFind = await SmartCard.findById(smartCardId);
        if(!smartCardFind) return res.json({success: false, msg: "Resume Not Found"});
        const updateSmartCard = await SmartCard.findByIdAndUpdate({_id: smartCardId}, req.body)
        return res.json({success: true, msg: "Resume Data Updated Successfully", smartCard: updateSmartCard});
    } catch (error) {
        console.log(error)
        return res.json({success: false, msg: "something went wrong", error})
    }
}

export const updateSmartCardName = async (req, res) => {
    const {smartCardId} = req.params;
    const {fileName} = req.body;
    try {
        const smartCardFind = await SmartCard.findById(smartCardId);
        if(!smartCardFind) return res.json({success: false, msg: "Resume Not Found"});
        const updateSmartCard = await SmartCard.findByIdAndUpdate({_id: smartCardId}, {fileName})
        const smartCards = await SmartCard.find();
        return res.json({success: true, msg: "Resume Data Updated Successfully", smartCards})
    } catch (error) {
        console.log(error)
        return res.json({success: false, msg: "something went wrong", error})
    }
}

export const deleteSmartCard = async (req, res) => {
    const {smartCardId} = req.params;
    try {
        const smartCard = await SmartCard.findByIdAndDelete(smartCardId);
        const smartCards = await SmartCard.find();
        return res.json({success: true, msg: "Smart Card Deleted Successfully", smartCards});
    } catch (error) {
        console.log(error);
        return res.json({success: false})
    }
}