$(document).ready(function() {
    //Gán các sự kiện cho các element
    initEvents();

    //Loading database
    loadingData();
});

// fn initEvents - start
function initEvents() {
    $("#savingBtn").click(saveData);

    $("#reloading-btn").click(loadingData);

    // Adding button show
    $("#btnAdding").click(function() {
        $("#dialogEmployee").show();
        $("#dialogEmployee input")[0].focus();
    });
    // Close button hide
    $(".fa-close, .btn-cancel").click(function() {
        $("#dialogEmployee").hide();
    });

    $('input[check]').blur(function() {
        // Lấy ra value:
        var value = this.value;
        // Kiểm tra value:
        if (!value) {
            // ĐẶt trạng thái tương ứng:
            // Nếu value rỗng hoặc null thì hiển thị trạng thái lỗi:
            $(this).addClass("item-input__error");
            $(this).attr('title', "Thông tin này không được phép để trống");
        } else {
            // Nếu có value thì bỏ cảnh báo lỗi:
            $(this).removeClass("item-input__error");
            $(this).removeAttr('title');
        }
    });

    $('input[type=email]').blur(function() {
        // Kiểm tra email:
        var email = this.value;
        var isEmail = checkEmailFormat(email);
        if (!isEmail) {
            $(this).addClass("input-item__error");
            $(this).attr('title', "Email không đúng định dạng.");
        } else {
            $(this).removeClass("input-item__error");
            $(this).removeAttr('title', "Email không đúng định dạng.");
        }
    });

    $(document).on('dblclick', 'table#tbEmployeeList tbody tr', function() {
        formMode = "edit";
        // Hiển thị form:
        $("#dialogEmployee").show();

        // Focus vào ô input đầu tiên:
        $("#dialogEmployee input")[0].focus();

        // Binding dữ liệu tương ứng với bản ghi vừa chọn:
        let data = $(this).data('entity');
        employeeId = $(this).data('id');

        // Duyệt tất cả các input:
        let inputs = $("#dialogEmployee input, #dialogEmployee select");
        for (const input of inputs) {
            // Đọc thông tin propValue:
            const propValue = $(input).attr("propValue");
            if (propValue) {
                let value = data[propValue];
                input.value = value;
            }
        }
    });


    $(document).on('click', 'table#tbEmployeeList tbody tr', function() {
        // Xóa tất cả các trạng thái được chọn của các dòng dữ liệu khác:
        $(this).siblings().removeClass('row-selected');
        // In đậm dòng được chọn:
        this.classList.add("row-selected");
        employeeId = $(this).data('id');
    });

    var btnAdding = document.getElementById("btnAdding");
    btnAdding.addEventListener("click", function() {
        formMode = "add";
        document.getElementById("dialogEmployee").style.display = "block";
        $('input').val(null);
        $('select').val(null);

        $.ajax({
            method: "GET",
            url: "https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
            success: function(newEmployeeCode) {
                $("#text-input").val(newEmployeeCode);
                $("#text-input").focus();
            }
        });
    })
}
// fn initEvents - end

var employeeId = null;
var formMode = "add";

//fn loadingData - start
function loadingData() {
    //Get API address
    $.ajax({
        type: "GET",
        async: false,
        url: "https://cukcuk.manhnv.net/api/v1/Employees",
        success: function(res) {
            $("table#tbEmployeeList tbody").empty();
            let ths = $("table#tbEmployeeList thead th");

            for (const emp of res) {
                //Duyệt từng cột
                var trElement = $(`<tr></tr>`)
                for (const th of ths) {
                    //Lấy ra proValue tương ứng với các cột
                    const proValue = $(th).attr("propValue");
                    const format = $(th).attr("format");
                    //Lấy giá trị tương ứng với tên của propValue trong đối tượng
                    let value = emp[proValue];
                    switch (format) {
                        case "date":
                            value = formatDate(value);
                            break;
                        case "money":
                            value = Math.round(Math.random(100) * 1000000);
                            value = formatMoney(value);
                            break;

                        default:
                            break;
                    }

                    let thHTML = `<th>${value || ""}</th>`;
                    trElement.append(thHTML);
                }
                $(trElement).data("id", emp.EmployeeId);
                $(trElement).data("entity", emp);
                $("table#tbEmployeeList tbody").append(trElement);


                // const employeeCode = emp.EmployeeCode;
                // const fullName = emp.FullName;
                // //Định dạng ngày, tháng, năm
                // let dateOfBirth = emp.DateOfBirth;
                // dateOfBirth = formatDate(dateOfBirth);

                // const genderName = emp.GenderName;
                // const phoneNumber = emp.PhoneNumber;
                // const email = emp.Email;
                // const positionName = emp.PositionName;
                // const departmentName = emp.DepartmentName;

                // //Định dạng tiền lương
                // let salary = Math.round(Math.random(100) * 1000000);
                // // Định dạng hiển thị tiền:
                // salary = formatMoney(salary);

                // const workStatus = emp.WorkStatus;

                // //Build thành các tr HTML tương ứng
                // let trHTML = `<tr>
                //                     <td>${employeeCode}</td>
                //                     <td>${fullName}</td>
                //                     <td>${dateOfBirth || ""}</td>
                //                     <td>${genderName || ""}</td>
                //                     <td>${phoneNumber}</td>
                //                     <td>${email}</td>
                //                     <td>${positionName || ""}</td>
                //                     <td>${departmentName || ""}</td>
                //                     <td>${salary || ""}</td>
                //                     <td>${workStatus || ""}</td>
                //                 </tr>`;

                // //Append các tr HTML vào tbody của table
                // $("table#tbEmployeeList tbody").append(trHTML);
            }
        },

        error: function(res) {
            console.log(res);
        }
    });
}
//fn loadingData - end

//fn save data - start
function saveData() {
    // Thu thập dữ liệu:
    let inputs = $("#dialogEmployee input, #dialogEmployee select");
    var employee = {};
    // build object:
    for (const input of inputs) {
        // Đọc thông tin propValue:
        const propValue = $(input).attr("propValue");
        // Lấy ra value:
        if (propValue) {
            let value = input.value;
            employee[propValue] = value;
        }
    }
    // Gọi api thực hiện cất dữ liệu:
    if (formMode == "edit") {
        $.ajax({
            type: "PUT",
            url: "https://cukcuk.manhnv.net/api/v1/Employees/" + employeeId,
            data: JSON.stringify(employee),
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                alert("Sửa dữ liệu thành công!");
                // load lại dữ liệu:
                loadingData();
                // Ẩn form chi tiết:
                $("#dialogEmployee").hide();

            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: "https://cukcuk.manhnv.net/api/v1/Employees",
            data: JSON.stringify(employee),
            dataType: "json",
            contentType: "application/json",
            success: function(res) {
                alert("Thêm mới dữ liệu thành công!");
                // load lại dữ liệu:
                loadingData();
                // Ẩn form chi tiết:
                $("#dialogEmployee").hide();
            }
        });
    }
}
//fn save data - end

/**
 * Định dạng hiển thị ngày tháng năm
 * @param {Date} date 
 * @returns 
 */
function formatDate(date) {
    try {
        if (date) {
            date = new Date(date);
            // Lấy ra ngày:
            dateValue = date.getDate();
            dateValue = dateValue < 10 ? `0${dateValue}` : dateValue;

            // lấy ra tháng:
            let month = date.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;

            // lấy ra năm:
            let year = date.getFullYear();

            return `${dateValue}/${month}/${year}`;
        } else {
            return "";
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Định dạng hiển thị tiền VND
 * @param {Number} money 
 */
function formatMoney(money) {
    try {
        money = new Intl.NumberFormat('vn-VI', { style: 'currency', currency: 'VND' }).format(money);
        return money;
    } catch (error) {
        console.log(error);
    }
}


//fn checkEmailFormat - start
var count = 0;

function checkEmailFormat(email) {
    count++;
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return email.match(re);
}
//fn checkEmailFormat - end