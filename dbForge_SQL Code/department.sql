CREATE TABLE `misa.21h.2022.nguyenthanhlam`.department (
  DepartmentID char(36) NOT NULL DEFAULT '' COMMENT 'ID phòng ban',
  DepartmentCode varchar(20) NOT NULL DEFAULT '' COMMENT 'Mã phòng ban',
  DepartmentName varchar(255) NOT NULL DEFAULT '' COMMENT 'Tên phòng ban',
  CreatedBy varchar(100) DEFAULT NULL COMMENT 'Người tạo',
  CreatedDate datetime DEFAULT NULL COMMENT 'Ngày tạo',
  ModifiedBy varchar(255) DEFAULT NULL COMMENT 'Người chỉnh sửa gần nhất',
  PRIMARY KEY (DepartmentID)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci,
COMMENT = 'Bảng thông tin phòng ban';