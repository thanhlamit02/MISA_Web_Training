using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_21H_WEBDEV.API.Entities;

namespace MISA_21H_WEBDEV.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        ///API lấy danh sách tất cả phòng ban
        ///<returns>Danh sách tất cả phòng ban</returns>
        ///Created by: Nguyễn Thành Lâm
        [HttpGet]
        public IActionResult GetAllDepartments()
        {
            return StatusCode(StatusCodes.Status200OK, new List<Department>
            {
               new Department
               {
                   DepartmentID = Guid.NewGuid(),
                   DepartmentName = "Phòng Kế toán",
                   CreatedBy = "Nguyễn Quốc Tuấn",
                   CreatedDate = DateTime.Now,  
                   ModifiedBy = "Hà Gia Nhân",
                   ModifiedDate = DateTime.Now
               },

                new Department
               {
                   DepartmentID = Guid.NewGuid(),
                   DepartmentName = "Phòng Nhân sự",
                   CreatedBy = "Nguyễn Thị Hương",
                   CreatedDate = DateTime.Now,
                   ModifiedBy = "Mai Quốc Khánh",
                   ModifiedDate= DateTime.Now
               },
            });
        }
    }
}

