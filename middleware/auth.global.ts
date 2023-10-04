export default defineNuxtRouteMiddleware(async (to, from) => {

    const user = useSupabaseUser()

    if ((to.path === "/links" || to.path == "/profile" || to.path === "/preview") && !user.value) {
        return navigateTo('/register');
    }

    if ((to.path === "/register" || to.path === "/login") && user.value) {
        return navigateTo('/links');
    }

})