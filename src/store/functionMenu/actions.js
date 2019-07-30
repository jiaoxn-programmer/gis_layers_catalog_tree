import * as types from './mutation_types'

/**
 * 设置当前激活的菜单
 * @param {Function} commit
 * @param {string} activateMenuIndex 当前激活的菜单的索引值
 */
export const setActivateMenuIndex = function ({ commit }, activateMenuIndex) {
    commit(types.SET_ACTIVATE_MENU_INDEX, activateMenuIndex)
}
