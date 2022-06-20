const createJob = async (req,res) => {
    res.send("create job")
}

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

export { createJob, deleteJob, getAllJobs, updateJob, showStats }