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
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({
        jobs,
        totalJobs: jobs.length,
        numOfPages: 1,
    });
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
