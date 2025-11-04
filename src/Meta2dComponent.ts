import { defineComponent, h, markRaw, onMounted, onUnmounted, renderSlot, shallowRef } from 'vue'
import {Meta2d} from "@meta2d/core";
import {createApp} from "./renderer";
import {useGetPropsByAttrs} from "./attr";
import {useMeta2d} from "./renderer/hooks/useMeta2d";

export const Meta2dComponent = defineComponent({
    setup(_props, { slots, expose, attrs }) {
        const dom = shallowRef<HTMLElement>()
        const container = shallowRef<Meta2d>()
        const config = useGetPropsByAttrs(attrs)
        function mount() {
            const meta2d = useMeta2d(dom.value,config)

            container.value = markRaw(meta2d.meat2d)
            const app = createApp({
                render: () => renderSlot(slots, 'default'),
            })
            app.mount(dom.value)
        }

        function unMount() {
            container.value!.destroy()
        }

        onMounted(() => {
            mount()
            // useEffectUpdate(attrs, container.value as unknown as ElementWithProps)
        })

        onUnmounted(unMount)
        expose({ app: container })

        return () => h('div', { ref: dom })
    },
})
