export interface Ubicacion {
    id: number;
    nombre: string;
}

export interface Localidad {
    id: number;
    id_provincia: number;
    nombre: string;
}

export interface Transmision {
    id: number;
    nombre: string;
}

export interface TipoMotor {
    id: number;
    nombre: string;
}

export interface EstadoLista {
    id: number;
    nombre: string;
    estado: number;
}

export interface TiposEstado {
    id: number;
    nombre: string;
}

export interface Usado {
    dominio: string;
    id_vehiculo: number;
    kilometraje: number;
    observaciones: string;
    color: string;
    exowner: string;
    email: string;
    id_tipo_documento?: number;
    documento?: number;
    telefono: string;
    celular: string;
    domicilio: string;
    numero: string;
    piso: string;
    dpto: string;
    id_provincia?: number;
    localidad: string;
    cp?: number;
    domicilio_observaciones: string;
    id_proveedor?: number;
    fecha_nacimiento: string;
    sexo?: number;
    precio_revista: string;
    precio_toma: string;
    precio_reparacion_estimado: string;
    created_at: string;
    updated_at: string;
    id_cliente: number;
    format_fecha_nacimiento: any;
    edad: any;
}

export interface Marca {
    id: number;
    nombre: string;
    cantidad: number;
}

export interface Foto {
    id: number;
    id_vehiculo: number;
    id_usuario: number;
    id_tipo_imagen: number;
    archivo: string;
    orden: number;
    estado: number;
    created_at: string;
    updated_at: string;
}

export interface Individuo {
    id: number;
    id_usuario: number;
    nombre: string;
    apellido: string;
    id_tipo_documento?: any;
    documento?: any;
    fecha_nacimiento?: any;
    telefono: string;
    domicilio?: any;
    email?: any;
    observaciones_domicilio?: any;
    id_localidad: number;
    id_provincia: number;
    observaciones?: any;
    created_at: string;
    updated_at: string;
}

export interface Historial {
    id: number;
    id_vehiculo: number;
    id_usuario: number;
    descripcion: string;
    id_estado: number;
    created_at: string;
    updated_at: string;
    estado: number;
}

export interface VehiculoDisponible {
    id: number;
    vistas: number;
    id_marca: number;
    modelo: string;
    id_localidad: number;
    id_ubicacion: number;
    id_estado: number;
    year: number;
    motor: number;
    id_tipo_motor: number;
    id_transmision: number;
    cantidad_puertas: number;
    entrega_minima?: any;
    precio_venta: string;
    precio_lista: string;
    estado_vehiculo: number;
    created_at: string;
    updated_at: string;
    eliminado: number;
    id_usuario: number;
    id_precios_vehiculos: number;
    publicado: boolean;
    calculo_entrega_minima: number;
    calculo_credito: number;
    ubicacion: Ubicacion;
    localidad: Localidad;
    transmision: Transmision;
    tipo_motor: TipoMotor;
    estado_lista: EstadoLista;
    tipos_estado: TiposEstado;
    usado: Usado;
    marca: Marca;
    fotos: Foto[];
    individuo: Individuo;
    historial: Historial[];
}