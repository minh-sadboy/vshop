export default function ({ store, redirect }) {
    if (store.state.login == 1 || store.state.login == 2) {
        if (store.state.login == 1) {
            return redirect('/customer/caidat')
        }
    } else {
        return redirect('/login')
    }
}