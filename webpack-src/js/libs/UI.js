/**
 * Author: DrowsyFlesh
 * Create: 2018/11/7
 * Description:
 */

export class UI {
    constructor({name, dependencies = []}) {
        this.name = name;
        this.dependencies = dependencies;
        this.loaded = false;
    }
    /**
     * 用于重载
     */
    load = () => {
        console.error(`UI ${this.name}'s load function is not recode!`);
    }
}