import Resume from "../Models/resumeModel.js";

export const createResume = async (req, res) => {
    const id = req.user._id;
    const { contact, 
        skills, 
        techSkills, 
        experience, 
        internship, 
        education, 
        interest, 
        projects, 
        volunteerExperience,
        honorsAndAwards,
        training,
        certification,
        license,
        course,
        patent,
        publication,
        workshop,
        reference} = req.body;
        try {
            req.body.userId = id;
            const resume = await new Resume(req.body);
            await resume.save();
            console.log('resume', resume);
            return res.json({success: true, msg: "Resume Data Updated Successfully", resume});
        } catch (error) {
            console.log(error);
            return res.json({success: false, msg: "something went wrong"})
        }
}

export const getAllResumesByUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const resumes = await Resume.find({userId})
        return res.json({success: true, msg: "User Resumes Sended Successfully", resumes})
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "something went wrong", error})
    }
}

export const getUniqueResume = async (req, res) => {
    const {resumeId} = req.params;
    try {
        const resume = await Resume.findById(resumeId);
        if(!resume) return res.json({success: false, msg: "Resume Not Found"})
        return res.json({success: true, msg: "Resume data sended successfully", resume});
    } catch (error) {
        console.log(error);
        return res.json({success: false, msg: "something went wrong", error})
    }
}

export const updateResume = async (req, res) => {
    const {resumeId} = req.params;
    try {
        console.log(req.body);
        const resumeFind = await Resume.findById(resumeId);
        if(!resumeFind) return res.json({success: false, msg: "Resume Not Found"});
        const updateResume = await Resume.findByIdAndUpdate({_id: resumeId}, req.body)
        return res.json({success: true, msg: "Resume Data Updated Successfully", resume: updateResume})
    } catch (error) {
        console.log(error)
        return res.json({success: false, msg: "something went wrong", error})
    }
}
export const updateResumeName = async (req, res) => {
    const {resumeId} = req.params;
    const {fileName} = req.body;
    try {
        console.log(req.body);
        const resumeFind = await Resume.findById(resumeId);
        if(!resumeFind) return res.json({success: false, msg: "Resume Not Found"});
        const updateResume = await Resume.findByIdAndUpdate({_id: resumeId}, {fileName})
        const resumes = await Resume.find();
        return res.json({success: true, msg: "Resume Data Updated Successfully", resumes})
    } catch (error) {
        console.log(error)
        return res.json({success: false, msg: "something went wrong", error})
    }
}

export const deleteResume = async (req, res) => {
    const {resumeId} = req.params;
    try {
        const resume = await Resume.findByIdAndDelete(resumeId);
        console.log(resume);
        const resumes = await Resume.find();
        return res.json({success: true, msg: "Resume Deleted Successfully", resumes});
    } catch (error) {
        console.log(error);
        return res.json({success: false})
    }
}

export const getAllResumes = async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.json({sucess: true, msg: "api running", resumes})
    } catch (error) {
        console.log(error)
    }
}