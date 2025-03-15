var express = require("express");
var router = express.Router();

const PostMessageService = require("../services/PostMessageService");
const postMessageService = new PostMessageService();

const SiteDataService = require("../services/SiteDataService");
const siteDataService = new SiteDataService("./data/sitedata.json");

router.get("/", async (request, response) => {
  const about = await siteDataService.getAbout();
  const pageInfo = await siteDataService.getPageInfo();
  const education = await siteDataService.getEducation();
  const courses = await siteDataService.getCourses();
  const work = await siteDataService.getWork();
  const testimonials = await siteDataService.getTestimonials();
  const personalInfo = await siteDataService.getPersonalInfo();

  response.render("layout", {
    template: "index",
    about,
    education,
    courses,
    work,
    testimonials,
    personalInfo,
    pageInfo,
  });
});

router.get("/technologies", async (request, response) => {
  const personalInfo = await siteDataService.getPersonalInfo();
  const pageInfo = await siteDataService.getPageInfo();
  const technologies = await siteDataService.getTechnologies();

  response.render("technologies", {
    template: "index",
    personalInfo,
    pageInfo,
    technologies,
  });
});

router.get("/technologydetail", async (request, response) => {
  const pageInfo = await siteDataService.getPageInfo();
  var tech = request.query.tech;
  const technologyDetail = await siteDataService.getTechnologyDetailByName(
    tech
  );

  response.render("technologydetail", {
    template: "index",
    pageInfo,
    technologyDetail,
  });
});

router.post("/api/form-submit", async (request, response, next) => {
  try {
    const { name, subject, email, message } = request.body;

    await postMessageService.postMessage(name, subject, email, message);

    response.end();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
