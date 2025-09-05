import axios from "axios";

export const AttendanceTimeIn = async (rfid_uid: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/attendance-timein`,
            { rfid_uid }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
