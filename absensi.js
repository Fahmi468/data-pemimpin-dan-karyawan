document.addEventListener('DOMContentLoaded', function() {
    // Initialize date range picker
    flatpickr("#dateRange", {
        mode: "range",
        dateFormat: "Y-m-d",
        maxDate: "today"
    });

    flatpickr("#izinDate", {
        dateFormat: "Y-m-d",
        minDate: "today"
    });

    // Update current time
    function updateTime() {
        const now = new Date();
        document.getElementById('currentTime').textContent = now.toLocaleTimeString('id-ID');
        document.getElementById('currentDate').textContent = now.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Handle Clock In
    document.getElementById('btnClockIn').addEventListener('click', function() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Simulate API call
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Clock In!',
                        text: `Waktu: ${new Date().toLocaleTimeString('id-ID')}`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    this.disabled = true;
                    document.getElementById('btnClockOut').disabled = false;
                }, 1000);
            }, function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal mendapatkan lokasi',
                    text: 'Mohon izinkan akses lokasi untuk melakukan absensi'
                });
            });
        }
    });

    // Handle Clock Out
    document.getElementById('btnClockOut').addEventListener('click', function() {
        Swal.fire({
            title: 'Konfirmasi Clock Out',
            text: "Anda yakin ingin melakukan clock out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Clock Out!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Simulate API call
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Clock Out!',
                        text: `Waktu: ${new Date().toLocaleTimeString('id-ID')}`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    this.disabled = true;
                }, 1000);
            }
        });
    });

    // Handle Export
    document.getElementById('exportAbsensi').addEventListener('click', function() {
        // Add export functionality here
        alert('Export functionality will be implemented here');
    });

    // Handle form submission
    document.getElementById('formIzin').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        Swal.fire({
            icon: 'success',
            title: 'Pengajuan Izin Berhasil',
            text: 'Pengajuan izin Anda akan diproses',
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            $('#modalIzin').modal('hide');
            this.reset();
        });
    });
});