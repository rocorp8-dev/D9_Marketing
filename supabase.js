import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Sincroniza el estado local con Supabase
 * @param {Object} state - El estado global de la aplicación
 */
export async function syncToCloud(state) {
    if (!state) return;

    // NOTA: Para este MVP, guardamos todo en una sola fila JSON para simplicidad
    // En una fase pro, crearíamos tablas relacionales (leads, tasks, etc.)
    const { data, error } = await supabase
        .from('ninja_storage')
        .upsert({
            id: 1, // ID fijo para el usuario director por ahora
            app_state: state,
            updated_at: new Date()
        }, { onConflict: 'id' });

    if (error) {
        console.error('Error sincronizando con Supabase:', error);
        return false;
    }
    return true;
}

/**
 * Carga el estado desde Supabase
 */
export async function loadFromCloud() {
    const { data, error } = await supabase
        .from('ninja_storage')
        .select('app_state')
        .eq('id', 1)
        .single();

    if (error) {
        console.warn('No se encontró estado en la nube o error:', error.message);
        return null;
    }
    return data.app_state;
}
