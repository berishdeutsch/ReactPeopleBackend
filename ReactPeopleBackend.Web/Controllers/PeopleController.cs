using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleBackend.Data;
using ReactPeopleBackend.Web.NewFolder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }
        [Route("addperson")]
        [HttpPost]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }

        [Route("deleteperson")]
        [HttpPost]
        public void DeletePerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(person.Id);
        }

        [Route("updateperson")]
        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Update(person);
        }
        [HttpPost]
        [Route("deletemany")]
        public void DeleteMany(List<int> ids)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(ids);
        }
    }
}
