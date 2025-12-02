const Bookmark = require("../models/Bookmark");

// Get all bookmarks for user
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .populate('job')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookmarks
    });
  } catch (err) {
    console.error("Get bookmarks error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookmarks"
    });
  }
};

// Add bookmark
exports.addBookmark = async (req, res) => {
  try {
    const { jobId, externalJobId, externalJobData } = req.body;

    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne({
      user: req.user.id,
      $or: [
        { job: jobId },
        { externalJobId: externalJobId }
      ].filter(Boolean)
    });

    if (existingBookmark) {
      return res.status(400).json({
        success: false,
        message: "Job already bookmarked"
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user.id,
      job: jobId || undefined,
      externalJobId: externalJobId || undefined,
      externalJobData: externalJobData || undefined
    });

    res.status(201).json({
      success: true,
      message: "Job bookmarked successfully",
      bookmark
    });
  } catch (err) {
    console.error("Add bookmark error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to bookmark job"
    });
  }
};

// Remove bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const { jobId, externalJobId } = req.params;

    const query = { user: req.user.id };
    if (jobId && jobId !== 'undefined') {
      query.job = jobId;
    } else if (externalJobId) {
      query.externalJobId = externalJobId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Job ID required"
      });
    }

    const bookmark = await Bookmark.findOneAndDelete(query);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Bookmark removed"
    });
  } catch (err) {
    console.error("Remove bookmark error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to remove bookmark"
    });
  }
};

// Check if job is bookmarked
exports.checkBookmark = async (req, res) => {
  try {
    const { jobId, externalJobId } = req.query;

    const query = { user: req.user.id };
    if (jobId) {
      query.job = jobId;
    } else if (externalJobId) {
      query.externalJobId = externalJobId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Job ID required"
      });
    }

    const bookmark = await Bookmark.findOne(query);

    res.status(200).json({
      success: true,
      isBookmarked: !!bookmark
    });
  } catch (err) {
    console.error("Check bookmark error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to check bookmark"
    });
  }
};
