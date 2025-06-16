/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre agent performance API for the agent performance reports
 */

"use strict";

const express = require("express");
const { mongo } = require("../../../utils/mongo");
const createError = require("http-errors");

const router = express.Router();

/**
 * @description
 *
 * GET /call-duration-by-date-range
 *
 * Fetches call duration data for agents within a specified date range.
 *
 * Example:
 * fetch('/call-duration-by-date-range?startDate=2023-01-01&endDate=2023-01-31')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get("/call-duration-by-date-range", (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next(createError(400, "Start date and end date are required"));
    }

    console.log(
      "Fetching call duration report for date range:",
      startDate,
      endDate
    );

    mongo(async (db) => {
      const data = await db
        .collection("agentPerformance")
        .aggregate([
          {
            $match: {
              date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
              },
            },
          },
          {
            $lookup: {
              from: "agents",
              localField: "agentId",
              foreignField: "agentId",
              as: "agentDetails",
            },
          },
          {
            $unwind: "$agentDetails",
          },
          {
            $group: {
              _id: "$agentDetails.name",
              totalCallDuration: { $sum: "$callDuration" },
            },
          },
          {
            $project: {
              _id: 0,
              agent: "$_id",
              callDuration: "$totalCallDuration",
            },
          },
          {
            $group: {
              _id: null,
              agents: { $push: "$agent" },
              callDurations: { $push: "$callDuration" },
            },
          },
          {
            $project: {
              _id: 0,
              agents: 1,
              callDurations: 1,
            },
          },
        ])
        .toArray();

      res.send(data);
    }, next);
  } catch (err) {
    console.error("Error in /call-duration-by-date-range", err);
    next(err);
  }
});


//m-85 query to return distinct list of regions
router.get("/regions", (req, res, next) => {
  try {
    mongo(async (db) => {
      const regions = await db
        .collection("agentPerformance")
        .distinct("region");
      res.json(regions);
    }, next);
  } catch (err) {
    console.error("An error occurred retrieving a list of regions", err);
    next(err);
  }
});

//performance by region
router.get("/performance-by-region",  (req, res, next) => {
  try {
    const region = req.query.region;

    // http://localhost:3000/api/reports/agent-performance/performance-by-region?region=Africa Fn +F1 to test api

    if (!region) {
      return next(createError(400, "Region parameter required"));
    }

    mongo(async (db) => {
      const performanceByRegionData = await db
        .collection("agentPerformance")
        .aggregate([
          {
            $match: { region: region },
          },
          {
            $project: {
              _id: 1,
              region: 1,
              team: 1,
              customerFeedback: 1,
              resolutionTime: 1,
            },
          },
        ])
        .toArray();
      res.send(performanceByRegionData);
    }, next);
  } catch (err) {
    console.error(
      "An error occurred retrieving performance by regions data",err );
  }
});

module.exports = router;

