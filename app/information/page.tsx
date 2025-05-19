import { FaEnvelope, FaSignInAlt, FaUserEdit, FaUserPlus } from "react-icons/fa";

export const metadata = {
    title: 'ขั้นตอนการเข้าสู่ระบบ',
};

export default function InformationPage() {
    return (
        <main className="min-h-screen bg-gray-400 py-16 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">
                    หากท่านไม่สามารถเพิ่มข้อมูลยานพาหนะได้ <br />กรุณาทำตามขั้นตอนด้านล่างนี้
                </h1>

                <ol className="space-y-10 text-gray-800 text-lg">
                    {/* Step 1 */}
                    <li className="flex items-start gap-5">
                        <FaUserEdit className="text-black mt-1.5" size={32} />
                        <div>
                            <p className="font-semibold mb-2">1. ให้ท่านกดเข้าสู่ระบบ</p>
                            <img
                                src="/img/info1.jpg"
                                alt="ขั้นตอนที่ 1"
                                className="w-full max-w-md rounded-xl shadow-md border border-gray-200 mt-2"
                            />
                        </div>
                    </li>

                    {/* Step 2 */}
                    <li className="flex items-start gap-5">
                        <FaUserPlus className="text-blue-500 mt-1.5" size={32} />
                        <div>
                            <p className="font-semibold mb-2">
                                2. เมื่อกดเข้าสู่ระบบจะปรากฏป็อปอัป Login ของ Clerk
                            </p>
                            <img
                                src="/img/clerk.png"
                                alt="Clerk Login"
                                className="w-full max-w-md rounded-xl shadow-md border border-gray-200 mt-2 mb-2"
                            />
                            <p className="text-gray-700">
                                หากคุณยังไม่มีบัญชี ให้คลิกที่ปุ่ม <strong>“Sign up”</strong> เพื่อสร้างบัญชีใหม่
                            </p>
                        </div>
                    </li>

                    {/* Step 3 */}
                    <li className="flex items-start gap-5">
                        <FaEnvelope className="text-green-500 mt-1.5" size={32} />
                        <div>
                            <p className="font-semibold mb-2">3. ยืนยันอีเมล</p>
                            <p className="text-gray-700">
                                ระบบจะส่งลิงก์ยืนยันไปยังอีเมลของคุณ กรุณาคลิกเพื่อยืนยันบัญชี
                            </p>
                        </div>
                    </li>

                    {/* Step 4 */}
                    <li className="flex items-start gap-5">
                        <FaSignInAlt className="text-purple-500 mt-1.5" size={32} />
                        <div>
                            <p className="font-semibold mb-2">4. เข้าสู่ระบบ</p>
                            <p className="text-gray-700">
                                เมื่อยืนยันเรียบร้อยแล้ว ให้คลิกที่ปุ่ม <strong>“Sign in”</strong> และเข้าสู่ระบบด้วยอีเมลของคุณ
                            </p>
                        </div>
                    </li>
                </ol>

                <div className="mt-12 text-center text-gray-600">
                    <p>
                        หากคุณมีบัญชีอยู่แล้ว คุณสามารถเข้าสู่ระบบได้ทันทีโดยไม่ต้องสมัครใหม่
                    </p>
                </div>
            </div>
        </main>
    );
}
