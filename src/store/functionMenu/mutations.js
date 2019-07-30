import * as types from './mutation_types'

export default {
    /**
     * 设置当前激活的菜单
     * @param {Object} state state对象
     * @param {string} activateMenuIndex 当前激活的菜单的index
     */
    [types.SET_ACTIVATE_MENU_INDEX] (state, activateMenuIndex) {
        state.activateMenuIndex = activateMenuIndex
    }
}
