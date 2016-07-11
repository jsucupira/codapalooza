﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using TampaInnovation.DataAccess;
using TampaInnovation.Models;

namespace TampaInnovation.WebServices.Controllers
{
    [RoutePrefix("users")]
    public class UsersController : ApiController
    {
        private ApplicationContext _ctx;

        public UsersController()
        {
            _ctx = new ApplicationContext();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_ctx != null)
                {
                    _ctx.Dispose();
                    _ctx = null;
                }
            }
            base.Dispose(disposing);
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult Register([FromBody] UserRegistration userRegistration)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _ctx.UserRegistrations.Add(userRegistration);
                    _ctx.SaveChanges();
                }
                catch (Exception)
                {
                    return StatusCode(HttpStatusCode.InternalServerError);
                }

                return StatusCode(HttpStatusCode.Accepted);
            }

            return BadRequest(ModelState);
        }

        [Route("")]
        [HttpGet]
        public List<UserRegistration> FindAll(DateTime asOf)
        {
            return _ctx.UserRegistrations.Where(t => t.CreatedDate > asOf).OrderBy(t => t.CreatedDate).ToList();
        }
    }
}