// 特約選択欄:1セレクトボックス
Vue.component('v-btn-select', {
    // event: change (変更された)
	props: {
        value: Array,
        // ボタンのスタイルに関する
        large: Boolean,             // 大きいサイズのボタン（default:false）
        column: Boolean,            // フレックス方向を列に設定（default:false）
        colorDefault: String,       // 未選択時のカラー（default:''）
        colorSelected: String,      // 選択時のカラー（default:'green lighten-4'）
        iconDefault: String,        // 未選択時のアイコン（default:''）
        iconSelected: String,       // 選択時のアイコン（default:''）
        iconColorDefault: String,   // 未選択時のアイコンカラー（default:''）
        iconColorSelected: String,  // 選択時のアイコンカラー（default:'green'）
        // ボタンの挙動に関する
        multiple: Boolean,          // 複数選択（default:false）
        mandatory: Boolean,         // 必須選択（default:false）
        options: Array,             // 選択項目（default:OK/NG）
	},
	data: function(){
        return {
            // 初期値
            mySelector: this.value ,
            // ボタンのスタイルに関する
            myLarge:                (this.large === '' || typeof this.large === 'undefined')                            ? false             : this.large,
            myColumn:               (this.column === '' || typeof this.column === 'undefined')                          ? false             : this.column,
            myColorDefault:         (this.colorDefault === '' || typeof this.colorDefault === 'undefined')              ? ''                : this.colorDefault,
            myColorSelected:        (this.colorSelected === '' || typeof this.colorSelected === 'undefined')            ? 'green lighten-4' : this.colorSelected,
            myIconDefault:          (this.iconDefault === '' || typeof this.iconDefault === 'undefined')                ? ''                : this.iconDefault,
            myIconSelected:         (this.iconSelected === '' || typeof this.iconSelected === 'undefined')              ? ''                : this.iconSelected,
            myIconColorDefault:     (this.iconColorDefault === '' || typeof this.iconColorDefault === 'undefined')      ? ''                : this.iconColorDefault,
            myIconColorSelected:    (this.iconColorSelected === '' || typeof this.iconColorSelected === 'undefined')    ? 'green'           : this.iconColorSelected,
            // ボタンの挙動に関する
            myMultiple: (this.multiple === '' || typeof this.multiple === 'undefined')      ? false : this.multiple,
            myMandatory: (this.mandatory === '' || typeof this.mandatory === 'undefined')   ? false : this.mandatory,
            myOptions: (this.options === '' || typeof this.options === 'undefined')         ? [
                {text: 'OK', value: 'ok', disabled: false},
                {text: 'NO', value: 'no', disabled: false},
            ]: this.options,
        }
	},
    template: `
        <v-layout 
            :column="column" 
            wrap>
            <v-btn v-for="(o, index) in myOptions" :key="index"
                :large="myLarge"
                :color="$_isSelect(index) ? myColorSelected : myColorDefault"
                :disabled="o.disabled"
                block
                @click="$_click(index)">
                <v-icon 
                    v-show="myIconDefault !== ''" 
                    :color="$_isSelect(index) ? myIconColorSelected : myIconColorDefault"
                    left
                >{{ $_isSelect(index) ? myIconSelected : myIconDefault }}</v-icon>
                <v-spacer ></v-spacer>
                <span v-html="o.text"></span>
                <v-spacer></v-spacer>
                <v-icon v-show="myIconDefault !== '' && column" left ></v-icon>
            </v-btn>
        </v-layout>
	`,
	methods: {
        $_isSelect: function(i){
            // ▪️Todo -> クリックされる旅に呼び出しされるためパフォーマス悪化になる。

            var ret = this.mySelector.indexOf(this.myOptions[i].value) >= 0;
            console.log('$_isSelect:' + this.myOptions[i].text + ':' + ret);
            return ret;
        },
        $_click: function(i){
            console.log('$_select');
            if(this.myMultiple){
                // 複数選択
                if (this.$_isSelect(i)){
                    if (this.myMandatory && this.mySelector.length === 1) return
                    this.mySelector.splice(this.mySelector.indexOf(this.myOptions[i].value), 1);
                }else{
                    this.mySelector.push(this.myOptions[i].value);
                }
            }else{
                // 単一選択
                if (this.$_isSelect(i)){
                    if (this.myMandatory && this.mySelector.length === 1) return
                    this.mySelector.splice(this.mySelector.indexOf(this.myOptions[i].value), 1);
                }else{
                    this.mySelector = [];
                    this.mySelector.push(this.myOptions[i].value);
                }
            }
            console.log(this.mySelector);
            this.$emit('input', this.mySelector);
            this.$emit('change');
        },
    }
})