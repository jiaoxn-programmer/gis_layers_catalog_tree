import CatalogTreeComponent from '@/components/catalog-tree/CatalogTreeComponent'

export default {
    name: 'CatalogTreeComponentWithSpan',
    components: {
        'catalog-tree-component': CatalogTreeComponent
    },
    data: function () {
        return {
            isShowCatalogTree: true
        }
    },
    methods: {
        changeCatalogTreeDisplayStatus: function () {
            this.isShowCatalogTree = !this.isShowCatalogTree
        }
    }
}
