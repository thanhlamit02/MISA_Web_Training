namespace MISA_21H_WEBDEV.API.Entities.DTO
{
    /// <summary>
    /// Dữ liệu trả về từ API lọc nhân viên
    /// </summary>
    public class PagingData
    {
        public List<Employee> Data { get; set; }

        public int TotalCount { get; set; }
    }
}
