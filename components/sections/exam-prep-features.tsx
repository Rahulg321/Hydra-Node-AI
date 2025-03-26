import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";

const ExamPrepFeatures = () => {
  return (
    <section className="relative flex flex-col items-center justify-center gap-[38px] px-4 py-[40px] sm:px-8 sm:py-[70px]">
      <div className="relative flex w-full max-w-[1200px] flex-col items-center gap-[30px] sm:gap-[50px]">
        {/* Header Section */}
        <div className="relative flex w-full flex-col items-center gap-[10px] self-stretch sm:gap-[15px]">
          <h1 className="transducer-font relative mt-[-1.00px] self-stretch text-center text-2xl font-medium leading-tight tracking-[-1.44px] text-white sm:text-3xl sm:leading-[45px] md:text-4xl">
            HOW WE CAN HELP YOU FOR YOUR EXAM PREPARATION
          </h1>
          <p className="relative mx-auto max-w-[600px] text-center font-normal leading-5 tracking-[-0.32px] text-gray-400 sm:leading-6">
            Master your certification journey with intelligent tools. Practice
            <br />
            smarter, not harder.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <Card className="w-full overflow-hidden rounded-[10.85px] border-none bg-[linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)] shadow-[0px_8.91px_14.3px_#00000040]">
              <CardContent className="relative h-[300px] p-4 sm:h-[360.7px] sm:p-0">
                <div className="relative h-full w-full overflow-hidden px-2 pt-2 sm:px-5 sm:pt-5">
                  <Image
                    className="absolute left-[73px] top-3 mx-auto h-auto w-full max-w-[214px] object-contain sm:h-[296px]"
                    alt="GraphRAG visualization"
                    width={214}
                    height={296}
                    src="/exam-prep-features/mask-group.png"
                  />

                  <div className="absolute left-[-3px] top-[392px] h-[960px] w-[712px] rotate-[78.60deg] rounded-[355.95px/479.78px] bg-[#ffffff12] blur-[307.09px]"></div>

                  <div className="absolute left-5 top-0 flex w-[385px] flex-col items-start gap-[8.52px]">
                    <h3 className="relative mt-[-0.39px] self-stretch text-[21.1px] font-medium leading-[normal] tracking-[0] text-[#d9d9d9] [font-family:'Transducer',Helvetica]">
                      GraphRAG-based Q&amp;A Generation
                    </h3>
                    <div className="relative flex w-[319px] items-center justify-center gap-[3.87px] px-0 py-[3.87px]">
                      <p className="relative mt-[-0.39px] flex-1 text-[14.2px] font-normal leading-[19.4px] text-white opacity-80">
                        Leveraging advanced GraphRAG technology, we provide
                        intelligent and contextually relevant questions that
                        enhance your understanding and retention.
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-[-7px] top-[83px] h-[227px] w-[601px]">
                    <div className="absolute left-[7px] top-[88px] h-[51px] w-[143px]">
                      <div className="absolute left-px top-0 h-[51px] w-[142px] shadow-[inset_0px_4px_8px_#ffffff24,inset_0px_-3px_6px_#0000001f] [background:linear-gradient(270deg,rgba(255,115,60,1)_0%,rgba(235,68,19,1)_100%)]"></div>
                      <div className="absolute left-[19px] top-[19px] w-[106px] text-xs font-bold leading-[14.0px] tracking-[-0.48px] text-white [font-family:'Transducer',Helvetica]">
                        HYDRANODE
                      </div>
                      <Image
                        className="absolute left-[31px] top-2 h-px w-[92px] object-cover"
                        alt="Line"
                        src="/exam-prep-features/line-4.svg"
                        width={92}
                        height={1}
                      />
                      <Image
                        className="absolute left-0 top-[26px] h-px w-[22px] object-cover"
                        alt="Line"
                        src="/exam-prep-features/line-5.svg"
                        width={22}
                        height={1}
                      />
                      <Image
                        className="absolute left-[119px] top-[26px] h-px w-6 object-cover"
                        alt="Line"
                        src="/exam-prep-features/line-5.svg"
                        width={24}
                        height={1}
                      />
                      <Image
                        className="absolute left-0 top-[37px] h-px w-[85px] object-cover"
                        alt="Line"
                        src="/exam-prep-features/line-4.svg"
                        width={85}
                        height={1}
                      />
                    </div>

                    <div className="absolute left-[154px] top-[88px] h-[51px] w-[45px] bg-[#ff723b] shadow-[inset_0px_4px_8px_#ffffff24,inset_0px_-3px_6px_#0000001f]">
                      <div className="absolute left-[9px] top-3 h-[27px] w-[27px] rounded-[13.5px] bg-white"></div>
                      <div className="absolute left-[15px] top-[18px] h-[15px] w-[15px]">
                        <Image
                          className="absolute left-px top-px h-3.5 w-3"
                          alt="Icon"
                          src="/exam-prep-features/group.png"
                          width={12}
                          height={14}
                        />
                      </div>
                    </div>

                    <div className="absolute left-[489px] top-px w-[106px] text-xs font-bold leading-[14.0px] tracking-[-0.48px] text-white [font-family:'Transducer',Helvetica]">
                      GOOGLE CLOUD
                    </div>

                    <div className="absolute left-[203px] top-0 h-[227px] w-[264px]">
                      <Image
                        className="absolute left-0 top-0 h-[103px] w-[263px]"
                        alt="Rectangle"
                        src="/exam-prep-features/rectangle-1000001650.svg"
                        width={263}
                        height={103}
                      />
                      <Image
                        className="absolute left-0 top-[124px] h-[103px] w-[263px]"
                        alt="Rectangle"
                        src="/exam-prep-features/rectangle-1000001654.svg"
                        width={263}
                        height={103}
                      />
                      <Image
                        className="absolute left-0 top-[90px] h-[46px] w-[264px]"
                        alt="Rectangle"
                        src="/exam-prep-features/rectangle-1000001653.svg"
                        width={264}
                        height={46}
                      />
                    </div>

                    <div className="absolute left-[470px] top-0 h-[49px] w-[5px] rounded-[10px] [background:linear-gradient(180deg,rgba(254,118,62,0.78)_0%,rgba(152,71,37,0.78)_100%)]"></div>
                    <div className="absolute left-[470px] top-[89px] h-[49px] w-[5px] rounded-[10px] [background:linear-gradient(180deg,rgba(254,118,62,0.78)_0%,rgba(152,71,37,0.78)_100%)]"></div>
                    <div className="absolute left-[470px] top-[178px] h-[49px] w-[5px] rounded-[10px] [background:linear-gradient(180deg,rgba(254,118,62,0.78)_0%,rgba(152,71,37,0.78)_100%)]"></div>

                    <div className="absolute left-[489px] top-[35px] w-[77px] text-[13px] font-normal leading-6 tracking-[-0.26px] text-[#ffffff4c] [font-family:'Inter',Helvetica]">
                      Professional
                    </div>

                    <div className="absolute left-[489px] top-[99px] flex w-[106px] flex-col items-start gap-1.5">
                      <div className="relative mt-[-1.00px] self-stretch text-xs font-bold leading-[14.0px] tracking-[-0.48px] text-white [font-family:'Transducer',Helvetica]">
                        AWS
                      </div>
                      <div className="relative self-stretch text-[13px] font-normal leading-6 tracking-[-0.26px] text-[#ffffff4c] [font-family:'Inter',Helvetica]">
                        Expert
                      </div>
                    </div>

                    <div className="absolute left-[489px] top-[188px] flex w-[106px] flex-col items-start gap-1.5">
                      <div className="relative mt-[-1.00px] self-stretch text-xs font-bold leading-[14.0px] tracking-[-0.48px] text-white [font-family:'Transducer',Helvetica]">
                        MICROSOFT
                      </div>
                      <div className="relative self-stretch text-[13px] font-normal leading-6 tracking-[-0.26px] text-[#ffffff4c] [font-family:'Inter',Helvetica]">
                        Beginner
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Generated Practice Tests */}
            <Card className="w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]">
              <CardContent className="relative h-[220px] p-4 sm:h-[247.36px] sm:p-0">
                <div className="absolute left-14 top-[22px] h-[225px] w-[525px]">
                  <Image
                    className="absolute left-[18px] top-2.5 h-[215px] w-[214px]"
                    alt="AI Practice Tests"
                    src="/exam-prep-features/mask-group-1.png"
                    width={214}
                    height={215}
                  />

                  <div className="absolute left-[163px] top-[61px] flex w-[362px] flex-col items-start gap-[8.52px]">
                    <h3 className="relative mt-[-0.39px] self-stretch text-[21.1px] font-medium leading-[normal] tracking-[0] text-[#d9d9d9] [font-family:'Transducer',Helvetica]">
                      AI Generated Practice Tests
                    </h3>
                    <div className="relative flex w-full items-center justify-center gap-[3.87px] self-stretch px-0 py-[3.87px]">
                      <p className="relative mt-[-0.39px] flex-1 text-[14.2px] font-normal leading-[19.4px] text-white opacity-80">
                        Dynamic question generation that adapts to your learning
                        style and knowledge gaps.
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-1 top-[66px] h-24 w-24 rounded-[16.66px] bg-[#0000008f]"></div>

                  <div className="absolute left-0 top-[49px] h-[105px] w-[105px] overflow-hidden rounded-[17.05px] bg-[#2c2c2c] shadow-[inset_1.16px_0.39px_12.86px_0.39px_#ffffff4c] backdrop-blur-[1.51px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(1.51px)_brightness(100%)]">
                    <Image
                      className="absolute left-2.5 top-[25px] h-20 w-[83px]"
                      alt="Google logo"
                      src="/exam-prep-features/bi-google.svg"
                      width={83}
                      height={80}
                    />
                  </div>

                  <div className="absolute left-[151px] top-[172px] h-[33px] w-[33px] overflow-hidden rounded-[10px]">
                    <div className="relative h-[49px] w-[49px] rounded-[10px] bg-[#2c2c2c] shadow-[inset_1.16px_0.39px_12.86px_0.39px_#ffffff4c] backdrop-blur-[1.51px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(1.51px)_brightness(100%)]">
                      <Image
                        className="absolute left-0 top-2 h-[25px] w-[33px]"
                        alt="Cisco logo"
                        src="/exam-prep-features/cib-cisco.svg"
                        width={33}
                        height={25}
                      />
                    </div>
                  </div>

                  <div className="absolute left-[218px] top-0 h-[42px] w-[42px] overflow-hidden rounded-[10px]">
                    <div className="relative h-[49px] w-[49px] rounded-[10px] bg-[#2c2c2c] shadow-[inset_1.16px_0.39px_12.86px_0.39px_#ffffff4c] backdrop-blur-[1.51px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(1.51px)_brightness(100%)]">
                      <Image
                        className="absolute left-0 top-[7px]"
                        alt="Nvidia logo"
                        src="/exam-prep-features/lineicons-nvidia.svg"
                        width={42}
                        height={35}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute left-[-3px] top-[412px] h-[960px] w-[712px] rotate-[78.60deg] rounded-[355.95px/479.78px] bg-[#ffffff12] blur-[307.09px]"></div>

                <Image
                  className="absolute left-1.5 top-[27px] h-10 w-[45px]"
                  alt="Polygon"
                  src="/exam-prep-features/polygon-2.svg"
                  width={45}
                  height={40}
                />
              </CardContent>
            </Card>

            {/* AI-Curated Exam Materials */}
            <Card className="w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]">
              <CardContent className="relative h-[291px] p-0">
                <div className="relative h-full w-full overflow-hidden px-5 pt-5">
                  <div className="absolute left-[24px] top-[155px] h-[169px] w-[157px] rounded-[78.45px/84.65px] bg-[#ffffff40] blur-[89.69px]"></div>
                  <div className="absolute left-[353px] top-[226px] h-[169px] w-[157px] rounded-[78.45px/84.65px] bg-[#ffffff1a] blur-[89.69px]"></div>

                  <Image
                    className="absolute left-[275px] top-3 h-[259px] w-48"
                    alt="AI-Curated Materials"
                    src="/exam-prep-features/mask-group-2.png"
                    width={192}
                    height={259}
                  />

                  <div className="absolute left-[-3px] top-[392px] h-[960px] w-[712px] rotate-[78.60deg] rounded-[355.95px/479.78px] bg-[#ffffff12] blur-[307.09px]"></div>

                  <div className="absolute left-5 top-0 flex w-[473px] flex-col items-start gap-[8.52px]">
                    <h3 className="relative mt-[-0.39px] self-stretch text-[21.1px] font-medium leading-[normal] tracking-[0] text-[#d9d9d9] [font-family:'Transducer',Helvetica]">
                      AI-Curated Exam Materials
                    </h3>
                    <div className="relative flex w-full items-center justify-center gap-[3.87px] self-stretch px-0 py-[3.87px]">
                      <p className="relative mt-[-0.39px] flex-1 text-[14.2px] font-normal leading-[19.4px] text-white opacity-80">
                        Our AI constantly analyzes exam trends and updates our
                        question bank to ensure you study the most relevant
                        content.
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-[-19px] top-28 h-[195px] w-64 rounded-[13px] bg-[#171717d9] shadow-[inset_-4px_4px_4px_#55555540]"></div>
                  <div className="absolute left-[102px] top-[38px] h-[257px] w-8 rotate-90 rounded-md shadow-[inset_-8px_6px_4px_#ffffff30] [background:linear-gradient(52deg,rgba(255,131,94,1)_0%,rgba(255,105,61,1)_100%)]"></div>

                  <Image
                    className="absolute left-[17px] top-[201px] h-[54px] w-[188px]"
                    alt="Frame"
                    src="/exam-prep-features/frame-1000011643.svg"
                    width={188}
                    height={54}
                  />

                  <div className="absolute left-[31px] top-[158px] w-44 text-center text-[13px] font-medium leading-[normal] tracking-[0] text-[#d9d9d9] [font-family:'Transducer',Helvetica]">
                    SCANNING...
                  </div>

                  <div className="absolute left-[250px] top-[91px] h-[164px] w-[357px]">
                    <div className="absolute left-[52px] top-0 h-[164px] w-[177px]">
                      {/* Neural network nodes and connections */}
                      <div className="absolute left-0 top-[29px] h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>
                      <div className="absolute left-[77px] top-0 h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>
                      <div className="absolute left-[77px] top-[46px] h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>
                      <div className="absolute left-[77px] top-[92px] h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff59,inset_0px_-5px_4px_#00000040]"></div>
                      <div className="absolute left-[152px] top-[46px] h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>
                      <div className="absolute left-[152px] top-[92px] h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>
                      <div className="absolute left-[77px] top-[138px] h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>
                      <div className="absolute left-0 top-[71px] h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>
                      <div className="absolute left-0 top-[113px] h-[25px] w-[25px] rounded-[12.56px] bg-[#fe693d] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>

                      {/* Connection lines */}
                      <Image
                        className="absolute left-[26px] top-3.5 h-[21px] w-[50px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-1.svg"
                        width={50}
                        height={21}
                      />
                      <Image
                        className="absolute left-[26px] top-11 h-4 w-[47px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-2.svg"
                        width={47}
                        height={16}
                      />
                      <Image
                        className="absolute left-[23px] top-[51px] h-[45px] w-[53px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-21.svg"
                        width={53}
                        height={45}
                      />
                      <Image
                        className="absolute left-[18px] top-[55px] h-[84px] w-[60px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-4.svg"
                        width={60}
                        height={84}
                      />
                      <Image
                        className="absolute left-[19px] top-[21px] h-[50px] w-[59px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-1.svg"
                        width={59}
                        height={50}
                      />
                      <Image
                        className="absolute left-[25px] top-[63px] h-[13px] w-12"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-6.svg"
                        width={48}
                        height={13}
                      />
                      <Image
                        className="absolute left-[26px] top-[87px] h-[18px] w-[47px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-7.svg"
                        width={47}
                        height={18}
                      />
                      <Image
                        className="absolute left-[22px] top-[94px] h-[51px] w-[52px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-8.svg"
                        width={52}
                        height={51}
                      />
                      <Image
                        className="absolute left-5 top-[25px] h-[89px] w-[63px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-9.svg"
                        width={63}
                        height={89}
                      />
                      <Image
                        className="absolute left-6 top-[70px] h-[47px] w-[50px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-10.svg"
                        width={50}
                        height={47}
                      />
                      <Image
                        className="absolute left-[27px] top-[110px] h-[15px] w-[46px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-6.svg"
                        width={46}
                        height={15}
                      />
                      <Image
                        className="absolute left-[26px] top-[132px] h-5 w-[46px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-12.svg"
                        width={46}
                        height={20}
                      />
                      <Image
                        className="absolute left-[104px] top-4 h-[34px] w-[47px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-21.svg"
                        width={47}
                        height={34}
                      />
                      <Image
                        className="absolute left-[102px] top-[23px] h-[70px] w-[51px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-4.svg"
                        width={51}
                        height={70}
                      />
                      <Image
                        className="absolute left-[105px] top-[54px] h-[5px] w-[43px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-23.svg"
                        width={43}
                        height={5}
                      />
                      <Image
                        className="absolute left-[103px] top-[67px] h-[33px] w-[46px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-21.svg"
                        width={46}
                        height={33}
                      />
                      <Image
                        className="absolute left-[103px] top-16 h-[34px] w-[46px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-1.svg"
                        width={46}
                        height={34}
                      />
                      <Image
                        className="absolute left-[99px] top-[69px] h-[69px] w-[54px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-9.svg"
                        width={54}
                        height={69}
                      />
                      <Image
                        className="absolute left-[105px] top-[103px] h-[5px] w-[43px]"
                        alt="Arrow"
                        src="/exam-prep-features/arrow-19.svg"
                        width={43}
                        height={5}
                      />
                      <Image
                        className="absolute left-[104px] top-28 h-[33px] w-[47px]"
                        alt="Arrow"
                        width={47}
                        height={33}
                        src="/exam-prep-features/arrow-1.svg"
                      />
                    </div>

                    <div className="absolute left-[231px] top-[62px] h-[39px] w-[66px]">
                      <div className="absolute left-10 top-[9px] h-[25px] w-[25px] rounded-[12.56px] bg-[#ff863b] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12]"></div>
                      <Image
                        className="absolute left-0 top-0 h-[21px] w-[42px]"
                        alt="Arrow"
                        height={21}
                        width={42}
                        src="/exam-prep-features/arrow-21.svg"
                      />
                      <Image
                        className="absolute top-[23px] h-[15px] w-[42px]"
                        alt="Arrow"
                        width={42}
                        height={15}
                        src="/exam-prep-features/arrow-6.svg"
                      />
                    </div>

                    <div className="absolute left-[334px] top-[73px] h-[22px] w-[22px] text-[10.4px] font-normal leading-[10.4px] tracking-[0] text-[#5e5e5e] [font-family:'Istok_Web',Helvetica]">
                      h(x)
                    </div>

                    <Image
                      className="absolute left-0 top-11 h-6 w-[50px]"
                      alt="Arrow"
                      width={50}
                      height={6}
                      src="/exam-prep-features/arrow-1.svg"
                    />

                    <div className="absolute left-0 top-[75px] h-[46px] w-[51px]">
                      <Image
                        className="absolute left-0 top-2 h-[38px] w-[51px]"
                        alt="Arrow"
                        width={51}
                        height={38}
                        src="/exam-prep-features/arrow-21.svg"
                      />

                      <Image
                        className="absolute left-0 top-0 h-2.5 w-[50px]"
                        alt="Arrow"
                        width={50}
                        height={2}
                        src="/exam-prep-features/arrow-26.svg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Real time exam engine */}
            <Card className="w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]">
              <CardContent className="relative h-[200px] p-4 sm:h-[206.11px] sm:p-0">
                <div className="absolute left-[10px] top-[-115px] h-[322px] w-[341px]">
                  <Image
                    className="absolute left-6 top-[147px] h-[174px] w-[214px]"
                    height={174}
                    width={214}
                    alt="Exam engine interface"
                    src="/exam-prep-features/mask-group-3.png"
                  />

                  <div className="absolute left-0 top-[136px] inline-flex flex-col items-start gap-[5.42px]">
                    <h3 className="relative mt-[-0.39px] w-[231px] text-[21.1px] font-medium leading-[normal] tracking-[0] text-[#d9d9d9] [font-family:'Transducer',Helvetica]">
                      Real time exam engine
                    </h3>
                    <div className="relative flex w-[340px] items-center justify-center gap-[3.87px] px-0 py-[3.87px]">
                      <p className="relative mt-[-0.39px] flex-1 text-[14.2px] font-normal leading-[19.4px] text-white opacity-80">
                        Experience the actual exam interface, time limits, and
                        question formats to build confidence and reduce test
                        anxiety.
                      </p>
                    </div>
                  </div>

                  <Image
                    className="absolute left-[178px] top-[245px] h-16 w-[163px]"
                    width={163}
                    height={16}
                    alt="Rectangle"
                    src="/exam-prep-features/rectangle-4.svg"
                  />

                  <div className="absolute left-[99px] top-0 h-[169px] w-[157px] rounded-[78.45px/84.65px] bg-[#ffffff40] blur-[89.69px]"></div>

                  <div className="absolute left-0 top-[275px] h-[27px] w-[27px] rounded-[13.5px] [background:linear-gradient(180deg,rgba(28,28,28,1)_0%,rgba(38,38,38,1)_100%)]"></div>

                  <div className="absolute left-1.5 top-[281px] h-[15px] w-[15px]">
                    <Image
                      className="absolute left-px top-px h-3.5 w-3"
                      height={15}
                      width={15}
                      alt="Icon"
                      src="/exam-prep-features/group-1.png"
                    />
                  </div>

                  <div className="absolute left-[191px] top-[254px] w-[136px] text-xs font-medium leading-[normal] tracking-[0] text-white">
                    We are preparing your Question set...
                  </div>
                </div>

                <div className="absolute left-[-3px] top-[412px] h-[960px] w-[712px] rotate-[78.60deg] rounded-[355.95px/479.78px] bg-[#ffffff12] blur-[307.09px]"></div>
              </CardContent>
            </Card>

            {/* Detailed Explanations */}
            <Card className="w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]">
              <CardContent className="relative h-[300px] p-4 sm:h-[401.94px] sm:p-6">
                <div className="relative h-full w-full overflow-hidden px-5 pt-5">
                  <Image
                    className="absolute left-[73px] top-3 h-[296px] w-[214px]"
                    height={296}
                    width={214}
                    alt="Detailed explanations"
                    src="/exam-prep-features/mask-group-4.png"
                  />

                  <div className="absolute left-5 top-0 flex w-[340px] flex-col items-start gap-[8.52px]">
                    <h3 className="relative mt-[-0.39px] self-stretch text-[21.1px] font-medium leading-[normal] tracking-[0] text-[#d9d9d9] [font-family:'Transducer',Helvetica]">
                      Detailed Explanations
                    </h3>
                    <div className="relative h-[68px] w-[332.03px]">
                      <p className="relative mt-[-0.39px] flex-1 text-[14.2px] font-normal leading-[19.4px] text-white opacity-80">
                        Every question comes with clear, concise explanations
                        for each answer option, helping you grasp the underlying
                        concepts.
                      </p>
                    </div>
                  </div>

                  <Image
                    className="absolute left-[195px] top-[149px] h-[171px] w-[181px]"
                    alt="Group"
                    width={181}
                    height={171}
                    src="/exam-prep-features/group-1000011097.png"
                  />

                  <div className="absolute left-0 top-[149px] h-[171px] w-[216px] rotate-180">
                    <div className="relative h-[171px]">
                      <div className="absolute left-[159px] top-[110px] h-[85px] w-2.5 -rotate-90 rounded-[49.59px] [background:linear-gradient(180deg,rgba(73,75,83,1)_0%,rgba(16,16,16,1)_100%)]"></div>
                      <div className="absolute left-[159px] top-24 h-[85px] w-2.5 -rotate-90 rounded-[49.59px] [background:linear-gradient(180deg,rgba(73,75,83,1)_0%,rgba(18,18,18,1)_100%)]"></div>
                      <div className="absolute left-[159px] top-[83px] h-[85px] w-2.5 -rotate-90 rounded-[49.59px] [background:linear-gradient(180deg,rgba(73,75,83,1)_0%,rgba(19,19,19,1)_100%)]"></div>
                      <div className="absolute left-[159px] top-[70px] h-[85px] w-[9px] -rotate-90 rounded-[49.59px] [background:linear-gradient(180deg,rgba(73,75,83,1)_0%,rgba(20,20,20,1)_100%)]"></div>
                      <div className="absolute -top-7 left-[159px] h-[85px] w-[9px] rotate-90 rounded-[49.59px] [background:linear-gradient(180deg,rgba(73,75,83,1)_0%,rgba(28,28,28,1)_100%)]"></div>
                      <div className="absolute left-[159px] top-[-15px] h-[85px] w-2.5 rotate-90 rounded-[49.59px] [background:linear-gradient(180deg,rgba(73,75,83,1)_0%,rgba(28,28,28,1)_100%)]"></div>
                      <div className="absolute -top-px left-[159px] h-[85px] w-[9px] rotate-90 rounded-[49.59px] [background:linear-gradient(180deg,rgba(73,75,83,1)_0%,rgba(26,27,27,1)_100%)]"></div>
                      <div className="absolute left-[159px] top-3 h-[85px] w-2.5 rotate-90 rounded-[49.59px] [background:linear-gradient(180deg,rgba(73,75,83,1)_0%,rgba(24,25,25,1)_100%)]"></div>
                      <div className="absolute left-[113px] top-[94px] h-[77px] w-[103px] rounded-[5px_0px_0px_5px] border-[none]"></div>
                      <div className="absolute left-[113px] top-0 h-[71px] w-[103px] rounded-[5px_0px_0px_5px] border-[none]"></div>

                      <Image
                        className="absolute left-8 top-[94px] h-[62px] w-[82px] -rotate-180"
                        width={82}
                        height={62}
                        alt="Line"
                        src="/exam-prep-features/line-7.svg"
                      />
                      <Image
                        className="absolute left-8 top-[11px] h-[62px] w-[82px] -rotate-180"
                        alt="Line"
                        width={82}
                        height={62}
                        src="/exam-prep-features/line-8.svg"
                      />

                      <div className="absolute left-0 top-[58px] h-[52px] w-[52px] rotate-180 rounded-[26px] bg-[#ff683c] shadow-[inset_0px_4px_4px_#ffffff6b,inset_0px_-6px_4px_#00000040]"></div>

                      <Image
                        className="absolute left-[13px] top-[71px] -rotate-180"
                        alt="List detail icon"
                        height={26}
                        width={26}
                        src="/exam-prep-features/fluent-apps-list-detail-24-filled.svg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI-Powered Advanced Assessment */}
            <Card className="w-full overflow-hidden rounded-[10.85px] border-none shadow-[0px_8.91px_14.3px_#00000040] [background:linear-gradient(129deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.08)_100%),linear-gradient(0deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.38)_100%)]">
              <CardContent className="relative h-[291px] p-0">
                <div className="absolute left-2 top-[-115px] h-[406px] w-[338px]">
                  <Image
                    className="absolute left-[113px] top-[147px]"
                    alt="Assessment visualization"
                    height={259}
                    width={214}
                    src="/exam-prep-features/mask-group-5.png"
                  />

                  <div className="absolute left-0 top-[136px] flex w-[231px] flex-col items-start gap-[5.42px]">
                    <h3 className="relative mt-[-0.39px] self-stretch text-[21.1px] font-medium leading-[normal] tracking-[0] text-[#d9d9d9] [font-family:'Transducer',Helvetica]">
                      AI-Powered Advanced Assessment
                    </h3>
                    <div className="relative flex w-full items-center justify-center gap-[3.87px] self-stretch px-0 py-[3.87px]">
                      <p className="relative mt-[-0.39px] flex-1 text-[14.2px] font-normal leading-[19.4px] text-white opacity-80">
                        Get detailed feedback and scoring on your practice
                        exams.
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-0 top-[291px] w-[142px] text-[56px] font-bold italic leading-[56.2px] tracking-[-1.92px] text-[#FF683C] [font-family:'Transducer',Helvetica]">
                    80%
                  </div>

                  <div className="absolute left-1 top-[355px] w-[155px] text-[13px] font-normal leading-[15px] tracking-[-0.26px] text-[#ffffff4c] [font-family:'Inter',Helvetica]">
                    Marks obtained for AI-ML Certification
                  </div>

                  <Image
                    className="absolute left-[306px] top-[294px]"
                    alt="Rectangle"
                    width={31}
                    height={86}
                    src="/exam-prep-features/rectangle-6.svg"
                  />

                  <div className="absolute left-[98px] top-0 h-[169px] w-[157px] rounded-[78.45px/84.65px] bg-[#ffffff40] blur-[89.69px]"></div>
                </div>

                <div className="absolute left-[-3px] top-[412px] h-[960px] w-[712px] rotate-[78.60deg] rounded-[355.95px/479.78px] bg-[#ffffff12] blur-[307.09px]"></div>

                <div className="absolute left-[352px] top-[122px] h-[142px] w-[31px] rounded-[49.59px] shadow-[inset_0px_4px_4px_#ffffff7d,inset_0px_-4px_4px_#7b3a12] [background:linear-gradient(180deg,rgba(255,104,60,1)_0%,rgba(255,104,60,0.2)_100%)]"></div>

                <div className="absolute left-[388px] top-[149px] h-[115px] w-[31px] rounded-[49.59px] bg-[#d9d9d914] shadow-[inset_1.16px_0.39px_5.04px_0.39px_#ffffff1a] backdrop-blur-[4.65px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4.65px)_brightness(100%)]"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamPrepFeatures;
