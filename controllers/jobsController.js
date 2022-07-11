import Job from "../models/Jobs.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createJob = async (req, res) => {
    const { position, company } = req.body;

    if (!position || !company) {
        throw new BadRequestError("Please provide all values");
    }

    req.body.createdBy = req.body.userId;
    
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
    res.send("all job");
};

const deleteJob = async (req, res) => {
    res.send("del job");
};

const updateJob = async (req, res) => {
    res.send("patch job");
};

const showStats = async (req, res) => {
    res.send("show stats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
