$(document).ready(function() {
    const btnSearch2 = $('#btnSearchFormula2');
    const dropdown = $('#btnSearch2Dropdown');
    const container = $('.btn-search2-container');
    
    btnSearch2.on('click', function(e) {
        e.stopPropagation();
        dropdown.toggleClass('show');
        btnSearch2.toggleClass('expanded');
    });
    $(document).on('click', function(e) {
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            dropdown.removeClass('show');
            btnSearch2.removeClass('expanded');
        }
    });
    $('.btn-search2-sub').on('click', function(e) {
        e.stopPropagation();
        dropdown.removeClass('show');
        btnSearch2.removeClass('expanded');
    });

    
  // เพิ่ม input file แบบ hidden สำหรับ import สูตร
  if ($('.btn-import-soot').length && $('#importSootFile').length === 0) {
    $('body').append('<input type="file" id="importSootFile" accept=".txt" style="display:none">');
  }
  $(document).on('click', '.btn-import-soot', function(e) {
    e.preventDefault();
    $('#importSootFile').val('');
    $('#importSootFile').click();
  });
  $(document).on('change', '#importSootFile', function(e) {
    var file = this.files[0];
    if (!file) return;
    if (file.type !== 'text/plain' && !file.name.match(/\.txt$/i)) {
      Swal.fire({
        icon: 'warning',
        title: 'เลือกไฟล์ไม่ถูกต้อง',
        text: 'กรุณาเลือกไฟล์ .txt เท่านั้น',
      });
      return;
    }
    var reader = new FileReader();
    reader.onload = function(evt) {
      var content = evt.target.result;
      content = content.replace(/ /g, ',');
      $('#soot').val(content);
    };
    reader.readAsText(file, 'utf-8');
  });
});
$('#btnSearchFormula').on('click', function (e) {
  e.preventDefault();
  var $form = $('#formulaForm');

  if ($('#typesoot').val() == '0') {
    Swal.fire({
      icon: 'warning',
      title: 'กรุณาเลือกหลักที่จะตรวจสอบ',
      text: 'โปรดเลือกหลักที่จะตรวจสอบก่อนทำการค้นหา',
    });
    return;
  }
  var typesoot = parseInt($('#typesoot').val());

  var tam = $('#tam').prop('checked');
  if (tam) {
    if (typesoot == 5 || typesoot == 6 || typesoot == 9 || typesoot == 10 || typesoot == 7) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อจำกัดสูตรแต้มรวม',
        text: 'สูตรแต้มรวม ต้องเลือกสูตร 2 หลักขึ้นไปนะครับ',
      });
      return;
    }
  }

  $('#formulaResult').html('<div class="text-center my-3"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

  $.ajax({
    url: '/check/search',
    method: 'POST',
    data: $form.serialize(),
    success: function (response) {
      $('#formulaResult').html(response);
      document.getElementById('formulaResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    error: function (xhr) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'เกิดข้อผิดพลาดในการค้นหา',
      });
      $('#formulaResult').html('');
    }
  });
});
$('.btn-search2-sub').on('click', function (e) {
  e.preventDefault();
  var $form = $('#formulaForm');

  if ($('#typesoot').val() == '0') {
    Swal.fire({
      icon: 'warning',
      title: 'กรุณาเลือกหลักที่จะตรวจสอบ',
      text: 'โปรดเลือกหลักที่จะตรวจสอบก่อนทำการค้นหา',
    });
    return;
  }
  var typesoot = parseInt($('#typesoot').val());

  var tam = $('#tam').prop('checked');
  if (tam) {
    if (typesoot == 5 || typesoot == 6 || typesoot == 9 || typesoot == 10 || typesoot == 7) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อจำกัดสูตรแต้มรวม',
        text: 'สูตรแต้มรวม ต้องเลือกสูตร 2 หลักขึ้นไปนะครับ',
      });
      return;
    }
  }

  $('#formulaResult').html('<div class="text-center my-3"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');
  $.ajax({
    url: '/check/search2?draw=' + $(this).data('draw'),
    method: 'POST',
    data: $form.serialize(),
    success: function (response) {
      $('#formulaResult').html(response);
      document.getElementById('formulaResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
      
    },
    error: function (xhr) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'เกิดข้อผิดพลาดในการค้นหา',
      });
      $('#formulaResult').html('');
    }
  });
});

$('#btnPercentFormula').on('click', function (e) {
  e.preventDefault();
  var $form = $('#formulaForm');

  if ($('#typesoot').val() == '0') {
    Swal.fire({
      icon: 'warning',
      title: 'กรุณาเลือกหลักที่จะตรวจสอบ',
      text: 'โปรดเลือกหลักที่จะตรวจสอบก่อนทำการค้นหา',
    });
    return;
  }
  var typesoot = parseInt($('#typesoot').val());

  var tam = $('#tam').prop('checked');
  if (tam) {
    if (typesoot == 5 || typesoot == 6 || typesoot == 9 || typesoot == 10 || typesoot == 7) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อจำกัดสูตรแต้มรวม',
        text: 'สูตรแต้มรวม ต้องเลือกสูตร 2 หลักขึ้นไปนะครับ',
      });
      return;
    }
  }

  $('#formulaResult').html('<div class="text-center my-3"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

  $.ajax({
    url: '/check/percent',
    method: 'POST',
    data: $form.serialize(),
    success: function (response) {
      $('#formulaResult').html(response);
      document.getElementById('formulaResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    error: function (xhr) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'เกิดข้อผิดพลาดในการค้นหาเปอร์เซ็น',
      });
      $('#formulaResult').html('');
    }
  });
});
function testone(id) {

  $('#formarea').html('<div class="text-center my-3"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>');

  var soot = document.getElementById('soot').value;
  $.ajax({
    url: '/check/testone',
    method: 'POST',
    data: { soot, id },
    success: function (response) {
      $('#formarea').html(response);
      document.getElementById('formarea').scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    error: function (xhr) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: '',
      });
      $('#formarea').html('');
    }
  });
}

// ฟังก์ชันสำหรับ export รูปภาพจาก div
function exportToImage() {
  const element = document.getElementById('export');
  if (!element) {
    Swal.fire({
      icon: 'error',
      title: 'ไม่พบข้อมูลที่จะ Export',
      text: 'ไม่พบข้อมูลผลการตรวจสอบสูตร'
    });
    return;
  }

  // แคปเจอร์ตรงจากหน้าเว็บ ไม่แก้ไขอะไรเลย
  html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: 3,
    useCORS: true,
    allowTaint: true,
    logging: false,
    removeContainer: false,
    async: true,
    proxy: null,
    letterRendering: true,
    imageTimeout: 15000,
    foreignObjectRendering: false
  }).then(canvas => {
    // สร้าง canvas ใหม่ที่มีขอบสีขาว
    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');
    const padding = 15;
    
    finalCanvas.width = canvas.width + (padding * 2);
    finalCanvas.height = canvas.height + (padding * 2);
    
    // เพิ่ม smoothing ให้ final canvas
    finalCtx.imageSmoothingEnabled = true;
    finalCtx.imageSmoothingQuality = 'high';
    
    // วาดพื้นหลังสีขาว
    finalCtx.fillStyle = '#ffffff';
    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    
    // วาดภาพต้นฉบับลงตรงกลาง
    finalCtx.drawImage(canvas, padding, padding);
    
    const link = document.createElement('a');
    link.download = 'ผลตรวจสูตร.jpg';
    link.href = finalCanvas.toDataURL('image/jpeg', 0.95);
    link.click();
  }).catch(error => {
    console.error('Export error:', error);
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'เกิดข้อผิดพลาดในการ Export รูปภาพ'
    });
  });
}
