export interface UserOptions {
    email: string,
    password: string
  }

export interface Individuo {
    id: number;
    id_usuario: number;
    nombre: string;
    apellido: string;
    id_tipo_documento: number;
    documento: number;
    fecha_nacimiento: string;
    telefono: string;
    domicilio: string;
    email: string;
    observaciones_domicilio: string;
    id_localidad: number;
    id_provincia: number;
    observaciones: string;
    created_at: string;
    updated_at: string;
}

export interface Puesto {
    id_puesto: number;
    nombre: string;
    departamento: string;
    icono: string;
}

export interface Agencia {
    id: number;
    nombre: string;
}

export interface Empleado {
    id: number;
    id_usuario: number;
    id_agencia: number;
    id_puesto: number;
    id_ubicacion: number;
    acceso_sistema: number;
    master: number;
    ventas_usados: number;
    ventas_0km: number;
    created_at: string;
    updated_at: string;
    segundo_correo: string;
    fotoperfil: string;
    puesto: Puesto;
    agencia: Agencia;
}

export interface Usuario {
    id: number;
    email: string;
    facebook_id?: any;
    created_at: string;
    updated_at: string;
    estado: number;
    individuo: Individuo;
    empleado: Empleado;
}