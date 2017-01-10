import { Layout } from 'preact-mdl';

export default class MaterialLayoutHelper {
    constructor(private layout: Layout) { }

    public toggleDrawer(): void {
        this.layout.base.MaterialLayout.toggleDrawer();
    }

    public get isSmallScreen(): boolean {
        return this.layout.base.classList.contains('is-small-screen');
    }

    public get hasFixedDrawer(): boolean {
        return this.layout.base.classList.contains('mdl-layout--fixed-drawer');
    }

    public get isVisible(): boolean {
        return this.layout.base.MaterialLayout.drawer_.classList.contains('is-visible');
    }
}
