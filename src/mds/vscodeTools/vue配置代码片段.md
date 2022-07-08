
### vue 的代码片段配置代码

#### 示例生成代码片段（https://snippet-generator.app/）

#### vue 2.0
```
{
    // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
    // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
    // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
    // same ids are connected.
    // Example:
    // "Print to console": {
    //  "prefix": "log",
    //  "body": [
    //      "console.log('$1');",
    //      "$2"
    //  ],
    //  "description": "Log output to console"
    // }
    "Print to console": {
        "prefix": "vue2",
        "body": [
            "<template>",
            "",
            "\t<div>",
            "\t</div>",
            "</template>",
            "<script>",
            "export default {",
               "data() {",
                  "return {",
                    "}",
                    "},",
                    "mounted() {",
                    ""  ,
                    "},",
                    "computed: {",
                    "},",
                    "methods: {",
                    ""  ,
                    "},",
                    "watch: {",
                    "}",
                    "}",
            "</script>",
            "<style lang=\"less\">",
            "",
            "</style>"

        ],
        "description": "Log output to console"
    }
}
```
#### vue 3.0
{
	// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
	"vue3": {
		"prefix": "vue3",
		"body": [
				"<template>",
				"    <div>\n",
				"    </div>",
				"</template>\n",
				"<script lang='ts'>",
			"import { defineComponent,reactive, toRefs, onBeforeMount, onMounted } from 'vue';",
			"import { useRoute, useRouter } from 'vue-router';",
			"export default defineComponent({",
			"    name: 'index',",
			"    setup(props, context) {",
			"    const route = useRoute();",
			"    const router = useRouter();",
			"    const state = reactive({\n",
			"    })",
			"    const funcList = {",
			"        getInfo() {}",
			"    }",
			"    onBeforeMount(() => {",
			"    })",
			"    onMounted(() => {",
			"        funcList.getInfo();",
			"    })",
			"    return {",
			"        ...toRefs(state),",
			"        ...funcList",
			"    }",
			"  },",
			"}",
			"</script>",
			"<style scoped lang='scss'>\n",
			"</style>",
		],
		"description": "Log output to console"
	}	
}

