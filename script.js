// Tunggu hingga dokumen siap
$(document).ready(function () {
    // Toggle Sidebar
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Aktifkan menu yang sedang dibuka
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('#sidebar ul li a');
    menuItems.forEach(item => {
        if(item.href === currentLocation){
            item.parentElement.classList.add('active');
        }
    });

    // Inisialisasi tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Fungsi pencarian untuk tabel
    $("#searchInput").on("keyup", function() {
        const value = $(this).val().toLowerCase();
        $(".table tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Konfirmasi Delete
    $('.btn-delete').on('click', function(e) {
        e.preventDefault();
        const row = $(this).closest('tr');
        
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Animasi fade out pada baris yang dihapus
                row.fadeOut(400, function() {
                    row.remove();
                });
                
                Swal.fire(
                    'Terhapus!',
                    'Data telah berhasil dihapus.',
                    'success'
                );
            }
        });
    });

    // Format Currency
    function formatRupiah(angka) {
        let number_string = angka.toString().replace(/[^,\d]/g, ''),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return 'Rp ' + rupiah;
    }

    // Format tanggal ke format Indonesia
    function formatDate(date) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(date).toLocaleDateString('id-ID', options);
    }

    // Reset form setelah modal ditutup
    $('.modal').on('hidden.bs.modal', function () {
        const form = $(this).find('form');
        form.removeClass('was-validated');
        form[0].reset();
    });

    // Loading state pada tombol
    $('.btn-submit').on('click', function() {
        const btn = $(this);
        btn.prop('disabled', true);
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
        
        // Simulasi loading
        setTimeout(function() {
            btn.prop('disabled', false);
            btn.html(btn.data('original-text'));
        }, 2000);
    });

    // Edit Data
    $('.btn-edit').on('click', function() {
        const row = $(this).closest('tr');
        const kode = row.find('td:eq(0)').text();
        const nama = row.find('td:eq(1)').text();
        const kepala = row.find('td:eq(2)').text();
        const lokasi = row.find('td:eq(4)').text();

        // Isi form edit dengan data yang ada
        $('#editDivisi').find('input[name="kode"]').val(kode);
        $('#editDivisi').find('input[name="nama"]').val(nama);
        $('#editDivisi').find('input[name="kepala"]').val(kepala);
        $('#editDivisi').find('input[name="lokasi"]').val(lokasi);
    });

    // Handle form submission
    $('#addDivisiForm, #editDivisiForm').on('submit', function(e) {
        e.preventDefault();
        
        if (this.checkValidity()) {
            const form = $(this);
            const btn = form.find('button[type="submit"]');
            
            // Tampilkan loading state
            btn.prop('disabled', true);
            btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...');
            
            // Simulasi pengiriman data
            setTimeout(function() {
                // Reset button state
                btn.prop('disabled', false);
                btn.html('Simpan');
                
                // Tutup modal
                form.closest('.modal').modal('hide');
                
                // Tampilkan notifikasi sukses
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data telah berhasil disimpan.',
                    timer: 1500,
                    showConfirmButton: false
                });
                
                // Reset form
                form[0].reset();
                form.removeClass('was-validated');
            }, 1000);
        }
    });

    // Export to Excel
    $('#exportExcel').on('click', function() {
        const table = document.querySelector('.table');
        const wb = XLSX.utils.table_to_book(table, {sheet: "Data Divisi"});
        XLSX.writeFile(wb, 'Data_Divisi.xlsx');
    });

    // Print
    $('#printData').on('click', function() {
        window.print();
    });

    // Responsive table scroll hint
    const tableWrapper = document.querySelector('.table-responsive');
    if (tableWrapper) {
        tableWrapper.addEventListener('scroll', function() {
            if (this.scrollLeft > 0) {
                this.classList.add('table-scrolled');
            } else {
                this.classList.remove('table-scrolled');
            }
        });
    }
});

// Tambahkan event listener untuk dark mode toggle jika ada
$('#darkModeToggle').on('click', function() {
    $('body').toggleClass('dark-mode');
    const isDarkMode = $('body').hasClass('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Check dark mode preference on load
if (localStorage.getItem('darkMode') === 'true') {
    $('body').addClass('dark-mode');
}