const fetch = require("node-fetch");

const fs = require("fs");
const util = require("util");
const baseUrl = "https://returnmikeclarkesitedata.azurewebsites.net/api/";

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

class SiteDataService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getData(url) {
    let response = "";
    let data = "";
    response = await fetch(url);
    data = await response.json();
    return data;
  }

  async getAbout() {
    //const data = null;
    try {
      const data = await this.getData(baseUrl + "about");
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).about;
    }
  }

  async getPageInfo() {
    try {
      const data = await this.getData(baseUrl + "pageinfo");
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).pageInfo;
    }
  }

  async getEducation() {
    try {
      const data = await this.getData(baseUrl + "education");
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).education;
    }
  }

  async getCourses() {
    try {
      const data = await this.getData(baseUrl + "courses");
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).courses;
    }
  }

  async getWork() {
    try {
      const data = await this.getData(baseUrl + "work");
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).work;
    }
  }

  async getTestimonials() {
    try {
      const data = await this.getData(baseUrl + "testimonials");
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).testimonials;
    }
  }

  async getPersonalInfo() {
    try {
      const data = await this.getData(baseUrl + "personalinfo");
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).personalInfo;
    }
  }

  async getTechnologies() {


    try {
      const data = await this.getData(baseUrl + "technology");
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).technology;
    }
  }

  async getTechnologyDetailByName(tech) {
    try {
      const data = await this.getData(baseUrl + "technology/" + tech);
      return data;
    } catch (error) {
      const data = await readFile(this.datafile, "utf8");
      return JSON.parse(data).technology.technologies.filter(item => item.name == tech)[0];
    }
    
  }
}

module.exports = SiteDataService;
