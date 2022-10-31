$(document).ready(function() {
    //Loading database
    loadingData();

    //1. show and close dialogAdding employee
    fnDialogEmployee();

    //2. savingData
    savingData();

    //3. reloadingData
    reloadingData();

    //4. Gán các sự kiện cho các element
    initEvents();

    //5. delete dialog
    deleteEmployee();
});


//1. fn show and close dialogAdding employee
function fnDialogEmployee() {
    // Adding button show
    $("#btnAdding").click(function() {
        $("#dialogEmployee").show();
        $("#dialogEmployee input")[0].focus();
    });

    // Close button hide
    $(".fa-close, .btn-cancel").click(function() {
        $("#dialogEmployee").hide();
    });
}

//fn delete dialog show and hide
function deleteEmployee() {
    $(".header-second__delete").click(function() {
        $("#delete-dialog").show();
    });

    $(".btn-deny, .fa-rectangle-xmark").click(function() {
        $("#delete-dialog").hide();
    });

    $(".btn-accept").click(function() {
        // Gọi api thực hiện xóa:
        $.ajax({
            type: "DELETE",
            url: "https://cukcuk.manhnv.net/api/v1/employees/" + employeeId,
            success: function(response) {
                $("#delete-dialog").hide();
                // Load lại dữ liệu:
                loadingData();
            }
        });
    });
}



//2. fn savingData
function savingData() {
    $("#savingBtn").click(saveData);
}

//3. fn reloadingData
function reloadingData() {
    $("#reloading-btn").click(loadingData);
}

//4. fn initEvents - start
function initEvents() {
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

//5. fn loadingData - start
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
            }
        },

        error: function(res) {
            console.log(res);
        }
    });
}
//fn loadingData - end

//6. fn save data - start
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
                $("#updating-new").show();
                closeToast();
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
                $("#adding-new").show();
                closeToast();
                // load lại dữ liệu:
                loadingData();
                // Ẩn form chi tiết:
                $("#dialogEmployee").hide();
            }
        });
    }
}
//fn save data - end


//7. Close toast message
function closeToast() {
    $(".fa-xmark").click(function() {
        $("#adding-new").hide();
        $("#updating-new").hide();
    });
}
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

//8. fn checkEmailFormat - start
var count = 0;

function checkEmailFormat(email) {
    count++;
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return email.match(re);
}
//fn checkEmailFormat - end