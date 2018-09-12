export interface Notificacion {
    id: number;
    id_usuario: number;
    prioridad: number;
    id_puesto: number;
    titulo: string;
    url: string;
    mensaje: string;
    created_at: string;
    updated_at: string;
    estado: number;
}