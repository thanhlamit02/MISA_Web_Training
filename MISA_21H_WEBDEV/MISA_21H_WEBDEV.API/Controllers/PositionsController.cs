using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_21H_WEBDEV.API.Entities;

namespace MISA_21H_WEBDEV.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        ///API lấy danh sách tất cả vị trí
        ///<returns>Danh sách tất cả vị trí</returns>
        ///Created by: Nguyễn Thành Lâm
            [HttpGet]
            public IActionResult GetAllPositions()
            {
                return StatusCode(StatusCodes.Status200OK, new List<Position>
            {
                new Position
                {
                    PositionID = Guid.NewGuid(),
                    PositionName = "Trưởng phòng",
                    CreatedBy = "Nguyễn Quốc Nam",
                    CreatedDate = DateTime.Now, 
                    ModifiedBy = "Lê Trung Tân",
                    ModifiedDate = DateTime.Now
                },

                new Position
                {
                    PositionID = Guid.NewGuid(),
                    PositionName = "Phó phòng",
                    CreatedBy = "Nguyễn Quốc Đại",
                    CreatedDate = DateTime.Now,
                    ModifiedBy = "Lê Tấn Thành",
                    ModifiedDate= DateTime.Now
                },
            });
            }
        }
}
