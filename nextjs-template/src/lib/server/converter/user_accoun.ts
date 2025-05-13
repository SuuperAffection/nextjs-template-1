import { User_AccountVO } from "@/lib/common/vo/user_account";
import { User_Account } from "../entity/user_account";

export namespace User_AccountConverter {
    export function toVO(src: User_Account.Type): User_AccountVO.Type {
        return {
            id: src.id,
            displayName: src.displayName,
            userId: src.userId,
            pw: src.pw,
            deleteFlag: src.deleteFlag,
            createUser: src.createUser,
            updateUser: src.updateUser,
            creation: src.creation ? src.creation.toISOString() : '',
            modification: src.modification ? src.modification.toISOString() : '',
            version: src.version
        }
    }

    export function apply(src: User_AccountVO.Type, dest: User_Account.Type) {
        dest.id = src.id,
            dest.displayName = src.displayName,
            dest.userId = src.userId,
            dest.pw = src.pw,
            dest.deleteFlag = src.deleteFlag,
            dest.createUser = src.createUser,
            dest.updateUser = src.updateUser,
            dest.creation = new Date(src.creation),
            dest.modification = new Date(src.modification),
            dest.version = src.version
    }
}