import mongoose from "mongoose";

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        res: "User"
    },
    fileName: {
        type: String,
        default: "untitled"
    },
    contact: {
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String},
        phone: {type: String},
        address: [],
        linkedinId: {type: String}
    },
    headline: {
        type: String
    },
    summary: [],
    skills: [],
    techSkills: [],
    experiences: [{
        designation: {type: String},
        companyName: {type: String},
        startedAt: {type: String},
        endedAt: {type: String},
        city: {type: String},
        country: {type: String},
        responsibilities: []
    }],
    internships: [{
        designation: {type: String},
        companyName: {type: String},
        startedAt: {type: String},
        endedAt: {type: String},
        city: {type: String},
        country: {type: String},
        responsibilities: [],
        
    }],
    educations: [{
        degreeName: {type: String},
        collegeName: {type: String},	
        city: {type: String},
        country: {type: String},	
        startedAt: {type: String},
        endedAt: {type: String},
        score: {type: String}
    }],
    interest: [],
    projects: [{
        number: {type: String},
        title: {type: String},
        startedAt: {type: String},
        endedAt: {type: String},
        descriptions: []
    }],
    volunteerExperiences: [{
        designation: {type: String},	
        companyName: {type: String},	
        startedAt: {type: String},
        endedAt: {type: String},
        city: {type: String},
        country: {type: String},
        responsibilities: [],
        
    }],
    honorsAndAwards: [],
    trainings: [{
        title: {type: String},
        institutionName: {type: String},
        city: {type: String},
        country: {type: String},
        startedAt: {type: String},
        endedAt: {type: String},
        score: {type: String}
    }],
    certifications: [{
        title: {type: String},
        institutionName: {type: String},
        city: {type: String},
        country: {type: String},
        startedAt: {type: String},
        endedAt: {type: String},
        score: {type: String}
    }],
    license: {
        name: {type: String},
        number: {type: String},
        issuer: {type: String},
        validFrom: {type: String},
        validTill: {type: String}
    },
    courses: [{
        title: {type: String},
        institutionName: {type: String},
        city: {type: String},
        country: {type: String},
        startedAt: {type: String},
        endedAt: {type: String},
        score: {type: String}
    }],
    patents: [{
        title: {type: String},
        number: {type: String},
        descriptions: [],
        status: {type: String}  
    }],
    publications: [{
        title: {type: String},
        date: {type: String},
        descriptions: []
    }],
    workshops: [{
        designation: {type: String},
        companyName: {type: String},
        city: {type: String},
        country: {type: String},
        startedAt: {type: String},
        endedAt: {type: String},
        responsibilities: [],
        
    }],
    references: [{
        name: {type: String},
        designation: {type: String},
        company: {type: String},
        email: {type: String}
    }],
    personalDetails: {
        languageKnown: [],
        dateOfBirth: {type: String},
        nationality: {type: String},
        passport: {type: String}
    }
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;