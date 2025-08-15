import React, { useEffect, useRef } from 'react'
import { Modal } from 'bootstrap'

function ModalDetail({ show, onClose, item }) {
    const modalRef = useRef(null)
    const modalInstanceRef = useRef(null)

    useEffect(() => {
        const el = modalRef.current
        if (!el) return
        // Crea o recupera la instancia del modal
        modalInstanceRef.current = Modal.getOrCreateInstance(el, { backdrop: true })

        const onHidden = () => { onClose && onClose() }
        const onHide = () => {
            // Evita la alerta: si el foco quedó dentro del modal, quítalo antes de aria-hidden
            const active = document.activeElement
            if (active && el.contains(active)) {
                active.blur()
            }
        }

        el.addEventListener('hide.bs.modal', onHide)
        el.addEventListener('hidden.bs.modal', onHidden)

        return () => {
            el.removeEventListener('hide.bs.modal', onHide)
            el.removeEventListener('hidden.bs.modal', onHidden)
            // Destruye la instancia para evitar fugas en hot-reload
            try { modalInstanceRef.current?.dispose() } catch { }
            modalInstanceRef.current = null
        }
    }, [onClose])

    useEffect(() => {
        const inst = modalInstanceRef.current
        if (!inst) return
        if (show) inst.show()
        else inst.hide()
    }, [show])

    const title = item?.safeTitle || item?.title || item?.name || '—'
    const posterUrl = item?.posterUrl || null
    const fullDate = item?.fullDate || item?.release_date || item?.first_air_date || '—'
    const rating = item?.rating ?? (Number.isFinite(item?.vote_average) ? +item.vote_average.toFixed(1) : '0')
    const overview = item?.overview || 'Sin descripción disponible.'

    return (
        <div
            className="modal fade"
            tabIndex="-1"
            ref={modalRef}
            aria-hidden="true"
            role="dialog"
            aria-modal="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        {/* Deja que Bootstrap cierre el modal; el evento hidden llamará onClose */}
                        <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex gap-3">
                            {posterUrl && (
                                <img
                                    src={posterUrl}
                                    alt={`Póster de ${title}`}
                                    style={{ width: 180, height: 270, objectFit: 'cover', borderRadius: 8, flex: '0 0 auto' }}
                                />
                            )}
                            <div>
                                <p><strong>Fecha:</strong> {fullDate}</p>
                                <p><strong>Puntuación:</strong> {rating}</p>
                                <p className="mb-0"><strong>Resumen:</strong></p>
                                <p className="mb-0">{overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDetail