import { getRole, updateRole } from "../../api/apiRoles.js";
import { loader2 } from "../../utils/loader.js";
import initRoles from "./roleRow.js";

function generateUpdateMarkup(dataOld, container) {
    const markup = `<form class="sub_main" action="" method="patch">
                        <div class="nav">
                            <div class="above_table">
                                <div class="ctg_name">
                                    <strong>Cập nhật vai trò</strong>
                                </div>
                            </div>
                            <div class="add-new">
                            </div>
                        </div>
                        <div class="add_cate add_common">
                            <div class="field">
                                <label for="name">Tên vai trò</label>
                                <input type="text" id="name" class="cm" name="name" value="${dataOld.name}">
                            </div>
                        </div>
                        <div>
                            <button class="btn-add">Cập nhật</button>
                        </div>
                    </form>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', markup);
}

export default async function handleUpdateCategory(idRole, container) {
    container.innerHTML = '';
    await loader2(container, 500);

    const dataOld = await getRole(idRole);
    generateUpdateMarkup(dataOld, container);

    const formAdd = document.querySelector('form');

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = new FormData(formAdd);
        const formData = Object.fromEntries(form);

        if (!formData.name) {
            alert('Vui lòng nhập đầy đủ các trường!');
            return;
        }

        const isAdd = confirm('Xác nhận chỉnh sửa vai trò?');

        if (!isAdd) return;

        await updateRole(idRole, formData);
        await initRoles(container);
    });
}
