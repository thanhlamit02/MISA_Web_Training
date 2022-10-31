using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_21H_WEBDEV.API.Entities;
using MISA_21H_WEBDEV.API.Entities.DTO;

namespace MISA_21H_WEBDEV.API.Controllers
{
    ///API lấy danh sách tất cả nhân viên
    ///<returns>Danh sách tất cả nhân viên</returns>
    ///Created by: Nguyễn Thành Lâm
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return StatusCode(StatusCodes.Status200OK, new List<Employee>
            {
                new Employee
                {
                    EmployeeID = Guid.NewGuid(),
                    EmployeeCode = "NV00001",
                    EmployeeName = "Nguyễn Văn Trí",
                    DateOfBirth = DateTime.Now,
                    Gender = 0,
                    IdentityNumber = "012345678899",
                    IdentityPlace = "Công an Hà Nội",
                    PositionID = Guid.NewGuid(),
                    PositionName = "Trưởng phòng",
                    DepartmentID = Guid.NewGuid(),
                    DepartmentName = "Phòng Nhân sự",
                    WorkStatus = 0,
                    CreatedBy = "Nguyễn Thị Huê",
                    CreatedDate = DateTime.Now,
                    ModifiedBy = "Lương Hải Hân",
                    ModifiedDate = DateTime.Now,
                    Salary = 124124124,
                    Email = "trinv@gmail.com",
                    JoinDate = DateTime.Now
                },

                new Employee
                {
                    EmployeeID = Guid.NewGuid(),
                    EmployeeCode = "NV00002",
                    EmployeeName = "Nguyễn Huỳnh Quang",
                    DateOfBirth = DateTime.Now,
                    Gender = 0,
                    IdentityNumber = "01234568899",
                    IdentityPlace = "Công an Hà Nam",
                    PositionID = Guid.NewGuid(),
                    PositionName = "Trưởng phòng",
                    DepartmentID = Guid.NewGuid(),
                    DepartmentName = "Phòng Tài chính",
                    WorkStatus = 0,
                    CreatedBy = "Nguyễn Anh Đức",
                    CreatedDate = DateTime.Now,
                    ModifiedBy = "Lương Hải Hân",
                    ModifiedDate = DateTime.Now,
                    Salary = 124124124,
                    Email = "quangnh@gmail.com",
                    JoinDate = DateTime.Now
                },

            });
        }                       

        /// <summary>
        /// API lấy thông tin chi tiết 1 nhân viên
        /// </summary>
        /// <param name="employeeID">ID Nhân viên</param>
        /// <returns>thông tin chi tiết 1 nhân viên</returns>
        /// Created by: Nguyễn Thành Lâm

        [HttpGet]
        [Route("{employeeID}")]        
        
        public IActionResult GetEmployeeByID([FromRoute] Guid employeeID)
        {
            return StatusCode(StatusCodes.Status200OK, new Employee
            {
                EmployeeID = Guid.NewGuid(),
                EmployeeCode = "NV00001",
                EmployeeName = "Nguyễn Văn Trí",
                DateOfBirth = DateTime.Now,
                Gender = 0,
                IdentityNumber = "012345678899",
                PositionID = Guid.NewGuid(),
                PositionName = "Trưởng phòng",
                DepartmentID = Guid.NewGuid(),
                DepartmentName = "Phòng Nhân sự",
                WorkStatus = 0,
                CreatedBy = "Nguyễn Thị Huê",
                CreatedDate = DateTime.Now,
                ModifiedBy = "Lương Hải Hân",
                ModifiedDate = DateTime.Now,
                Salary = 124124124
            });
        }

        /// <summary>
        /// API lọc danh sách nhân viên có điều kiện tìm kiếm và phân trang
        /// </summary>
        /// <param name="keyword">Muốn tìm kiếm (Mã NV, Tên NV, Số điện thoại)</param>
        /// <param name="positionID">ID của vị trí</param>
        /// <param name="departmentID">ID của phòng ban</param>
        /// <param name="limit">Số bản ghi trong 1 trang</param>
        /// <param name="offset">Vị trí bản ghi bắt đầu lấy dữ liệu</param>
        /// <returns>Danh sách nhân viên</returns>
        /// Created by: Nguyễn Thành Lâm
        [HttpGet]
        [Route("filter")]
        public IActionResult FilterEmployees(
            [FromQuery] string keyword, 
            [FromQuery] Guid positionID,
            [FromQuery] Guid departmentID,
            [FromQuery] int limit,
            [FromQuery] int offset)
        {
            return StatusCode(StatusCodes.Status200OK, new PagingData
            {
                Data = new List<Employee> {
                    new Employee
                    {
                        EmployeeID = Guid.NewGuid(),
                        EmployeeCode = "NV00001",
                        EmployeeName = "Nguyễn Văn Trí",
                        DateOfBirth = DateTime.Now,
                        Gender = 0,
                        IdentityNumber = "012345678899",
                        PositionID = Guid.NewGuid(),
                        PositionName = "Trưởng phòng",
                        DepartmentID = Guid.NewGuid(),
                        DepartmentName = "Phòng Nhân sự",
                        WorkStatus = 0,
                        CreatedBy = "Nguyễn Thị Huê",
                        CreatedDate = DateTime.Now,
                        ModifiedBy = "Lương Hải Hân",
                        ModifiedDate = DateTime.Now,
                        Salary = 124124124
                    },

                    new Employee
                    {
                        EmployeeID = Guid.NewGuid(),
                        EmployeeCode = "NV00002",
                        EmployeeName = "Nguyễn Huỳnh Quang",
                        DateOfBirth = DateTime.Now,
                        Gender = 0,
                        IdentityNumber = "01234568899",
                        PositionID = Guid.NewGuid(),
                        PositionName = "Trưởng phòng",
                        DepartmentID = Guid.NewGuid(),
                        DepartmentName = "Phòng Tài chính",
                        WorkStatus = 0,
                        CreatedBy = "Nguyễn Anh Đức",
                        CreatedDate = DateTime.Now,
                        ModifiedBy = "Lương Hải Hân",
                        ModifiedDate = DateTime.Now,
                        Salary = 124124124
                    },
                },
                TotalCount = 3
            });
        }

        /// <summary>
        /// API thêm mới 1 nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên cần thêm mới</param>
        /// <returns>ID của nhân viên vừa thêm mới</returns>

        [HttpPost]
        public IActionResult InsertEmployee([FromBody] Employee employee)
        {
            return StatusCode(StatusCodes.Status201Created, Guid.NewGuid());
        }

        /// <summary>
        /// API sửa thông tin 1 nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên cần sửa thông tin</param>
        /// <param name="employeeID">ID của nhân viên cần sửa thông tin</param>
        /// <returns>ID của nhân viên cần sửa</returns>
        /// Created by: Nguyễn Thành Lâm

        [HttpPut]
        [Route("{employeeID}")]
        public IActionResult UpdateEmployee([FromBody] Employee employeeID)
        {
            return StatusCode(StatusCodes.Status200OK, employeeID);
        }
        /// <summary>
        /// API xóa thông tin 1 nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên cần xóa thông tin</param>
        /// <param name="employeeID">ID của nhân viên cần xóa thông tin</param>
        /// <returns>ID của nhân viên cần sửa</returns>
        /// Created by: Nguyễn Thành Lâm

        [HttpDelete]
        [Route("{employeeID}")]
        public IActionResult DeleteEmployee([FromRoute] Guid employeeID)
        {
            return StatusCode(StatusCodes.Status200OK, employeeID);
        }
    }
}
