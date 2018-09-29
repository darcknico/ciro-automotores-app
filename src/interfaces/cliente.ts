export interface TipoDocumento {
    id: number;
    nombre: string;
    estado: number;
}

export interface TipoResponsable {
    id: number;
    nombre: string;
    estado: number;
}

export interface Provincia {
    id: number;
    nombre: string;
}

export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    id_tipo_documento: number;
    documento: any;
    fecha_nacimiento: string;
    telefono: string;
    celular: string;
    email: string;
    domicilio: string;
    numero: string;
    piso: string;
    domicilio_observaciones: string;
    localidad: string;
    id_provincia: number;
    cp: string;
    observaciones: string;
    created_at: string;
    updated_at: string;
    estado: number;
    id_usuario: number;
    id_agencia: number;
    id_tipo_responsable: number;
    format_fecha_nacimiento: string;
    edad: string;
    tipo_documento: TipoDocumento;
    tipo_responsable: TipoResponsable;
    provincia: Provincia;

    uuid: string;
    id_cliente: number;
}