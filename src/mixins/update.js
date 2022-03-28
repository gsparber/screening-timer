export default {
    data() {
        return {
            // refresh variables
            refreshing: false,
            registration: null,
            updateExists: false,
        }
    },

    created() {
        // Listen for our custom event from the SW registration
        document.addEventListener('swUpdated', this.updateAvailable, {once: true})

        // Prevent multiple refreshes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (this.refreshing) return
            this.refreshing = true
            // Here the actual reload of the page occurs
            window.location.reload()
        })
    },

    methods: {
        // Store the SW registration so we can send it a message
        // We use `updateExists` to control whatever alert, toast, dialog, etc we want to use
        // To alert the user there is an update they need to refresh for
        updateAvailable(event) {
            this.registration = event.detail
            this.updateExists = true
            this.$matomo.trackEvent("Anwendung", "Aktualisieren", "Aktualisierung - Verfügbar");
        },

        // Called when the user accepts the update
        refreshApp() {

            this.$swal.fire({
                title: 'ACHUTUNG!! - Beim Aktualisieren werden alle Timer gestoppt!',
                text: "Sie können dies nicht rückgängig machen!",
                icon: 'error',
                position: 'top',
                showCancelButton: true,
                confirmButtonColor: '#198754',
                cancelButtonColor: '#dc3545',
                cancelButtonText: 'Abbrechen',
                confirmButtonText: 'TIMER STOPPEN und Aktualisieren'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.updateExists = false
                    // Make sure we only send a 'skip waiting' message if the SW is waiting
                    if (!this.registration || !this.registration.waiting) return
                    // send message to SW to skip the waiting and activate the new SW
                    this.registration.waiting.postMessage({type: 'SKIP_WAITING'})
                    this.$matomo.trackEvent("Anwendung", "Aktualisieren", "Aktualisieren - Gestartet");
                }
            })
        },
    },
}
