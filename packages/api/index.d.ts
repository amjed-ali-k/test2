import { Elysia } from "elysia";
declare const app: Elysia<"", {
    decorator: {};
    store: {};
    derive: {};
    resolve: {};
}, {
    typebox: {};
    error: {};
}, {
    schema: {};
    standaloneSchema: {};
    macro: {
        readonly authType?: "user" | "org" | "admin" | undefined;
    };
    macroFn: {
        readonly authType: (type: "user" | "org" | "admin") => void;
    };
    parser: {};
}, {
    health: {
        check: {
            get: {
                body: unknown;
                params: {};
                query: {
                    by?: string | undefined;
                };
                headers: unknown;
                response: {
                    200: {
                        message: string;
                        data: {
                            dbRead: number;
                            dbWrite: number;
                            cryptoFunc: number;
                            dbBulkRead: number;
                        };
                    };
                    500: "Internal Server Error";
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    twilio: {
        callback: {
            post: {
                body: {
                    userId: string;
                    status: "USER_ACCEPTED" | "USER_BUSY" | "USER_UNATTENDED" | "USER_REJECTED" | "FAILED";
                    planTaskId: number;
                    planId: number;
                    orgId: number;
                };
                params: {};
                query: {
                    bodySHA256?: string | undefined;
                };
                headers: unknown;
                response: {
                    200: string | {
                        id: number;
                        shiftPlanId: number;
                        taskId: number | null;
                        plannedAt: Date;
                        status: "PENDING" | "CANCELLED" | "INVITATION_ACCEPTED" | "EXECUTED" | "ERRORED" | "USER_ACCEPTED" | "USER_BUSY" | "USER_UNATTENDED" | "USER_REJECTED" | "FAILED";
                        type: string;
                        userId: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                    }[];
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    twilio: {
        callback: {
            reminder: {
                post: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: string;
                    };
                };
            };
        };
    };
} & {
    public: {
        contact: {
            post: {
                body: {
                    message: string;
                    email: string;
                    name: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    get: {
        body: unknown;
        params: {};
        query: unknown;
        headers: unknown;
        response: {
            200: {
                message: string;
                time: string;
                version: string;
            };
        };
    };
} & {
    "favicon.ico": {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: string;
            };
        };
    };
} & {
    "robots.txt": {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    message: string;
                    time: string;
                    version: string;
                };
            };
        };
    };
} & {
    upgrade: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    message: string;
                    time: string;
                    version: string;
                    log: string[];
                };
            };
        };
    };
} & {
    public: {
        "med-travel": {
            all: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            createdBy: string | null;
                            patientName: string;
                            patientEmail: string | null;
                            patientPhone: string;
                            patientAddressline1: string;
                            patientCity: string;
                            patientPostalCode: string;
                            pickupTime: Date;
                            appoinmentTime: Date;
                            pickupAddressline1: string;
                            pickupCity: string;
                            pickupPostalCode: string;
                            appoinmentAddressline1: string;
                            appoinmentCity: string;
                            appoinmentPostalCode: string;
                            vehicleType: string;
                            durationOfAppointment: number | null;
                            specialRequirements: string | null;
                        }[];
                    };
                };
            };
        };
    };
} & {
    public: {
        "med-travel": {
            new: {
                post: {
                    body: {
                        specialRequirements?: string | undefined;
                        patientEmail: string;
                        patientPhone: string;
                        patientAddressline1: string;
                        patientCity: string;
                        patientPostalCode: string;
                        pickupTime: string;
                        appoinmentTime: string;
                        pickupAddressline1: string;
                        pickupCity: string;
                        pickupPostalCode: string;
                        appoinmentAddressline1: string;
                        appoinmentCity: string;
                        appoinmentPostalCode: string;
                        vehicleType: string;
                        durationOfAppointment: number;
                        patientFirstName: string;
                        patientLastName: string;
                        patientSex: "male" | "female";
                        pickupDate: string;
                        appoinmentDate: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            message: string;
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        invitations: {};
    } & {
        invitations: {
            all: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            viewed: boolean;
                            invitedById: string;
                            shiftAdId: number;
                            jobId: number | null;
                            startDate: Date | null;
                            createdAt: Date;
                            organizationId: number | null;
                        }[];
                    };
                };
            };
        };
    } & {
        invitations: {
            unread: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            count: number;
                        }[];
                    };
                };
            };
        };
    } & {
        invitations: {
            markAsViewed: {
                put: {
                    body: {
                        invitationId: number;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: string;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        invitations: {
            accept: {
                ":shiftAdId": {
                    put: {
                        body: {
                            type: "MARKETPLACE" | "FORCE_ASSIGN" | "FAVORITE" | "INTERNAL" | "DIRECT" | "INVITATION";
                        };
                        params: {
                            shiftAdId: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: string | undefined;
                            403: "User not found";
                            404: "Invitation not found";
                            400: string;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        organization: {};
    } & {
        organization: {
            ":organizationId": {
                get: {
                    body: unknown;
                    params: {
                        organizationId: number;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            email: string;
                            name: string;
                            phone: string;
                            createdAt: Date;
                            addressLine1: string;
                            addressLine2: string;
                            city: string;
                            pinCode: string;
                            latitude: number;
                            longitude: number;
                            timezone: string;
                            website: string;
                            coverImage: string;
                            logo: string;
                            subBlocks: {
                                description: string | null;
                                id: number;
                                name: string;
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                            }[];
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        organization: {
            ":organizationId": {
                status: {
                    get: {
                        body: unknown;
                        params: {
                            organizationId: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                totalAdsPosted: number;
                                totalCompleted: number;
                                totalUpcoming: number;
                                totalPaidAmount: number;
                                totalJobs: number;
                            };
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        shiftAds: {};
    } & {
        shiftAds: {
            all: {
                get: {
                    body: unknown;
                    params: {};
                    query: Partial<{
                        type?: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM" | undefined;
                        hourlyRate?: number | undefined;
                        shiftStart?: Date | undefined;
                        shiftEnd?: Date | undefined;
                    }>;
                    headers: unknown;
                    response: {
                        200: {
                            title: string | null;
                            description: string | null;
                            duration: number;
                            id: number;
                            type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            organizationId: number;
                            hourlyRate: number;
                            shiftStart: Date;
                            shiftEnd: Date;
                            userType: string[] | null;
                            vacancy: number;
                            status: "PENDING" | "APPROVED" | "REJECTED" | "MARKETPLACE" | "INVITATION_SENT_TO_PERMANENT_STAFF" | "INVITATION_SENT_TO_INTERNAL_STAFF" | "PRIVATE" | "CRITICAL" | "CANCELLED" | "COMPLETED" | "EXPIRED";
                            groupId: number | null;
                            applicationCount: number;
                            workflow: "DIRECT_TO_MARKETPLACE" | "INVITE_INTERNAL_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_INTERNAL_STAFF_THEN_MARKETPLACE" | "CLOSE_CALL" | "DIRECT_TO_USER" | "DIRECT_TO_INTERNAL_USER" | "FORCE_ASSIGN";
                            postedById: string;
                            subBlockId: number;
                            applications: {
                                id: number;
                                status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "EXPIRED";
                            }[];
                        }[];
                        404: "User not found";
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        shiftAds: {
            ":shiftAdId": {
                get: {
                    body: unknown;
                    params: {
                        shiftAdId: number;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            title: string | null;
                            description: string | null;
                            duration: number;
                            id: number;
                            type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            hourlyRate: number;
                            actualRate: number;
                            shiftStart: Date;
                            shiftEnd: Date;
                            userType: string[] | null;
                            vacancy: number;
                            status: "PENDING" | "APPROVED" | "REJECTED" | "MARKETPLACE" | "INVITATION_SENT_TO_PERMANENT_STAFF" | "INVITATION_SENT_TO_INTERNAL_STAFF" | "PRIVATE" | "CRITICAL" | "CANCELLED" | "COMPLETED" | "EXPIRED";
                            groupId: number | null;
                            applicationCount: number;
                            workflow: "DIRECT_TO_MARKETPLACE" | "INVITE_INTERNAL_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_INTERNAL_STAFF_THEN_MARKETPLACE" | "CLOSE_CALL" | "DIRECT_TO_USER" | "DIRECT_TO_INTERNAL_USER" | "FORCE_ASSIGN";
                            listingType: "INTERNAL" | "PUBLIC" | "PRIORITY";
                            postedById: string;
                            subBlockId: number;
                            applications: {
                                id: number;
                                status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "EXPIRED";
                            }[];
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        shiftAds: {
            ":shiftAdId": {
                apply: {
                    put: {
                        body: {
                            type?: "MARKETPLACE" | "FORCE_ASSIGN" | "FAVORITE" | "INTERNAL" | "DIRECT" | "INVITATION" | undefined;
                            userId?: string | undefined;
                        };
                        params: {
                            shiftAdId: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                id: number;
                                type: "MARKETPLACE" | "FORCE_ASSIGN" | "FAVORITE" | "INTERNAL" | "DIRECT" | "INVITATION";
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "EXPIRED";
                                shiftId: number;
                            }[] | {
                                message: string;
                                title?: undefined;
                            } | {
                                title: string;
                                message: string;
                            };
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    } & {
        shiftAds: {
            ":shiftAdId": {
                applicationStatus: {
                    get: {
                        body: unknown;
                        params: {
                            shiftAdId: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                status: string;
                            };
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    } & {
        shiftAds: {
            applications: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            type: "MARKETPLACE" | "FORCE_ASSIGN" | "FAVORITE" | "INTERNAL" | "DIRECT" | "INVITATION";
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "EXPIRED";
                            shiftId: number;
                            shift: {
                                title: string | null;
                                description: string | null;
                                duration: number;
                                id: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                organizationId: number;
                                hourlyRate: number;
                                shiftStart: Date;
                                shiftEnd: Date;
                                userType: string[] | null;
                                vacancy: number;
                                status: "PENDING" | "APPROVED" | "REJECTED" | "MARKETPLACE" | "INVITATION_SENT_TO_PERMANENT_STAFF" | "INVITATION_SENT_TO_INTERNAL_STAFF" | "PRIVATE" | "CRITICAL" | "CANCELLED" | "COMPLETED" | "EXPIRED";
                                groupId: number | null;
                                applicationCount: number;
                                workflow: "DIRECT_TO_MARKETPLACE" | "INVITE_INTERNAL_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_INTERNAL_STAFF_THEN_MARKETPLACE" | "CLOSE_CALL" | "DIRECT_TO_USER" | "DIRECT_TO_INTERNAL_USER" | "FORCE_ASSIGN";
                                postedById: string;
                                subBlockId: number;
                            };
                        }[];
                    };
                };
            };
        };
    } & {
        shiftAds: {
            ":shiftAdId": {
                cancel: {
                    put: {
                        body: unknown;
                        params: {
                            shiftAdId: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: "Application not found" | "Already cancelled" | "Cannot cancel";
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        shift: {};
    } & {
        shift: {
            current: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            userId: string;
                            start: Date;
                            end: Date;
                            hourlyRate: number;
                            actualRate: number;
                            shiftAdId: number;
                            status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                            organizationSubBlockId: number;
                            shiftAd: {
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            };
                            timesheet: {
                                id: number;
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                paidBreak: number | null;
                                userId: string;
                                status: "CANCELLED" | "DRAFT" | "APPLIED" | "APPROVED_BY_ORGANIZATION" | "APPROVED_BY_ADMIN" | "REJECTED_BY_ORGANIZATION" | "REJECTED_BY_ADMIN" | "PAID_BY_ORGANIZATION" | "PAID_BY_ADMIN";
                                startedAt: Date;
                                endedAt: Date | null;
                                unpaidBreak: number | null;
                                overtimeStart: Date | null;
                                overtimeEnd: Date | null;
                                paymentDate: Date | null;
                                chat: {
                                    time: string;
                                    message: string;
                                    userId: string;
                                    varient: "primary" | "outline" | "destructive";
                                    role: "user" | "service";
                                }[] | null;
                            };
                        } | undefined;
                    };
                };
            };
        };
    } & {
        shift: {
            ":shiftId": {
                put: {
                    body: {
                        time?: Date | undefined;
                        activity: "CHECK_IN" | "CHECK_OUT" | "BREAK_START" | "BREAK_END" | "OVERTIME_START" | "OVERTIME_END";
                    };
                    params: {
                        shiftId: number;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            message: string;
                            varient: string;
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        shift: {
            current: {
                entries: {
                    get: {
                        body: unknown;
                        params: {};
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                id: number;
                                type: "CHECK_IN" | "CHECK_OUT" | "BREAK_START" | "BREAK_END" | "OVERTIME_START" | "OVERTIME_END";
                                createdAt: Date;
                                updatedAt: Date;
                                createdBy: string | null;
                                timesheetId: number;
                                time: Date;
                            }[];
                        };
                    };
                };
            };
        };
    } & {
        shift: {
            upcoming: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            userId: string;
                            start: Date;
                            end: Date;
                            hourlyRate: number;
                            actualRate: number;
                            shiftAdId: number;
                            status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                            organizationSubBlockId: number;
                        }[];
                    };
                };
            };
        };
    } & {
        shift: {
            completed: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            userId: string;
                            start: Date;
                            end: Date;
                            hourlyRate: number;
                            actualRate: number;
                            shiftAdId: number;
                            status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                            organizationSubBlockId: number;
                        }[];
                    };
                };
            };
        };
    } & {
        shift: {
            cancelled: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            userId: string;
                            start: Date;
                            end: Date;
                            hourlyRate: number;
                            actualRate: number;
                            shiftAdId: number;
                            status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                            organizationSubBlockId: number;
                        }[];
                    };
                };
            };
        };
    } & {
        shift: {
            all: {
                get: {
                    body: unknown;
                    params: {};
                    query: {
                        from?: string | null | undefined;
                        to?: string | null | undefined;
                    };
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            userId: string;
                            start: Date;
                            end: Date;
                            hourlyRate: number;
                            actualRate: number;
                            shiftAdId: number;
                            status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                            organizationSubBlockId: number;
                        }[];
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        shift: {
            single: {
                ":id": {
                    get: {
                        body: unknown;
                        params: {
                            id: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                id: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                userId: string;
                                start: Date;
                                end: Date;
                                hourlyRate: number;
                                actualRate: number;
                                shiftAdId: number;
                                status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                                organizationSubBlockId: number;
                            } | undefined;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    } & {
        shift: {
            approved: {
                ":userId": {
                    post: {
                        body: {
                            fromDate: Date;
                            toDate: Date;
                        };
                        params: {
                            userId: string;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                id: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                userId: string;
                                start: Date;
                                end: Date;
                                hourlyRate: number;
                                actualRate: number;
                                shiftAdId: number;
                                status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                                organizationSubBlockId: number;
                            }[];
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    } & {
        shift: {
            cancel: {
                ":shiftId": {
                    put: {
                        body: unknown;
                        params: {
                            shiftId: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: string;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        timesheet: {};
    } & {
        timesheet: {
            ":timesheetId": {
                get: {
                    body: unknown;
                    params: {
                        timesheetId: number;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            paidBreak: number | null;
                            userId: string;
                            status: "CANCELLED" | "DRAFT" | "APPLIED" | "APPROVED_BY_ORGANIZATION" | "APPROVED_BY_ADMIN" | "REJECTED_BY_ORGANIZATION" | "REJECTED_BY_ADMIN" | "PAID_BY_ORGANIZATION" | "PAID_BY_ADMIN";
                            startedAt: Date;
                            endedAt: Date | null;
                            unpaidBreak: number | null;
                            overtimeStart: Date | null;
                            overtimeEnd: Date | null;
                            paymentDate: Date | null;
                            chat: {
                                time: string;
                                message: string;
                                userId: string;
                                varient: "primary" | "outline" | "destructive";
                                role: "user" | "service";
                            }[] | null;
                            entries: {
                                id: number;
                                type: "CHECK_IN" | "CHECK_OUT" | "BREAK_START" | "BREAK_END" | "OVERTIME_START" | "OVERTIME_END";
                                createdAt: Date;
                                updatedAt: Date;
                                createdBy: string | null;
                                timesheetId: number;
                                time: Date;
                            }[];
                            shift: {
                                id: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                userId: string;
                                start: Date;
                                end: Date;
                                hourlyRate: number;
                                actualRate: number;
                                shiftAdId: number;
                                status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                                organizationSubBlockId: number;
                            };
                        } | {
                            shift: {
                                id: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                userId: string;
                                start: Date;
                                end: Date;
                                hourlyRate: number;
                                actualRate: number;
                                shiftAdId: number;
                                status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                                organizationSubBlockId: number;
                                shiftAd: {
                                    title: string | null;
                                    description: string | null;
                                    duration: number;
                                    id: number;
                                    type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                    createdAt: Date;
                                    updatedAt: Date;
                                    organizationId: number;
                                    hourlyRate: number;
                                    actualRate: number;
                                    shiftStart: Date;
                                    shiftEnd: Date;
                                    userType: string[] | null;
                                    vacancy: number;
                                    status: "PENDING" | "APPROVED" | "REJECTED" | "MARKETPLACE" | "INVITATION_SENT_TO_PERMANENT_STAFF" | "INVITATION_SENT_TO_INTERNAL_STAFF" | "PRIVATE" | "CRITICAL" | "CANCELLED" | "COMPLETED" | "EXPIRED";
                                    groupId: number | null;
                                    applicationCount: number;
                                    workflow: "DIRECT_TO_MARKETPLACE" | "INVITE_INTERNAL_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_INTERNAL_STAFF_THEN_MARKETPLACE" | "CLOSE_CALL" | "DIRECT_TO_USER" | "DIRECT_TO_INTERNAL_USER" | "FORCE_ASSIGN";
                                    listingType: "INTERNAL" | "PUBLIC" | "PRIORITY";
                                    postedById: string;
                                    subBlockId: number;
                                };
                            };
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            paidBreak: number | null;
                            userId: string;
                            status: "CANCELLED" | "DRAFT" | "APPLIED" | "APPROVED_BY_ORGANIZATION" | "APPROVED_BY_ADMIN" | "REJECTED_BY_ORGANIZATION" | "REJECTED_BY_ADMIN" | "PAID_BY_ORGANIZATION" | "PAID_BY_ADMIN";
                            startedAt: Date;
                            endedAt: Date | null;
                            unpaidBreak: number | null;
                            overtimeStart: Date | null;
                            overtimeEnd: Date | null;
                            paymentDate: Date | null;
                            chat: {
                                time: string;
                                message: string;
                                userId: string;
                                varient: "primary" | "outline" | "destructive";
                                role: "user" | "service";
                            }[] | null;
                        };
                        404: "Timesheet not found";
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        timesheet: {
            ":timesheetId": {
                entries: {
                    get: {
                        body: unknown;
                        params: {
                            timesheetId: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                id: number;
                                type: "CHECK_IN" | "CHECK_OUT" | "BREAK_START" | "BREAK_END" | "OVERTIME_START" | "OVERTIME_END";
                                createdAt: Date;
                                updatedAt: Date;
                                createdBy: string | null;
                                timesheetId: number;
                                time: Date;
                            }[];
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    } & {
        timesheet: {
            entry: {
                ":entryID": {
                    put: {
                        body: {
                            time: Date;
                        };
                        params: {
                            entryID: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: void;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    } & {
        timesheet: {
            entry: {
                ":entryID": {
                    delete: {
                        body: unknown;
                        params: {
                            entryID: number;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: never;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    } & {
        timesheet: {
            all: {
                get: {
                    body: unknown;
                    params: {};
                    query: {
                        days?: number | undefined;
                        month?: number | undefined;
                    };
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            paidBreak: number | null;
                            userId: string;
                            status: "CANCELLED" | "DRAFT" | "APPLIED" | "APPROVED_BY_ORGANIZATION" | "APPROVED_BY_ADMIN" | "REJECTED_BY_ORGANIZATION" | "REJECTED_BY_ADMIN" | "PAID_BY_ORGANIZATION" | "PAID_BY_ADMIN";
                            startedAt: Date;
                            endedAt: Date | null;
                            unpaidBreak: number | null;
                            overtimeStart: Date | null;
                            overtimeEnd: Date | null;
                            paymentDate: Date | null;
                            chat: {
                                time: string;
                                message: string;
                                userId: string;
                                varient: "primary" | "outline" | "destructive";
                                role: "user" | "service";
                            }[] | null;
                            shift: {
                                id: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                userId: string;
                                start: Date;
                                end: Date;
                                hourlyRate: number;
                                actualRate: number;
                                shiftAdId: number;
                                status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                                organizationSubBlockId: number;
                            };
                            payments: {
                                id: number;
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                userId: string;
                                status: "PENDING" | "CANCELLED" | "FAILED" | "PAID_BY_ORGANIZATION" | "PAID_BY_ADMIN";
                                paymentDate: Date | null;
                                timesheetId: number;
                                amount: number;
                                paidAmount: number;
                                invoiceId: string | null;
                                dueDate: Date;
                                releaseDate: Date | null;
                                releaseAmount: number;
                                paidBy: string | null;
                            }[];
                        }[];
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        timesheet: {
            timesheets: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number;
                            paidBreak: number | null;
                            userId: string;
                            status: "CANCELLED" | "DRAFT" | "APPLIED" | "APPROVED_BY_ORGANIZATION" | "APPROVED_BY_ADMIN" | "REJECTED_BY_ORGANIZATION" | "REJECTED_BY_ADMIN" | "PAID_BY_ORGANIZATION" | "PAID_BY_ADMIN";
                            startedAt: Date;
                            endedAt: Date | null;
                            unpaidBreak: number | null;
                            overtimeStart: Date | null;
                            overtimeEnd: Date | null;
                            paymentDate: Date | null;
                            chat: {
                                time: string;
                                message: string;
                                userId: string;
                                varient: "primary" | "outline" | "destructive";
                                role: "user" | "service";
                            }[] | null;
                            organization: {
                                id: number;
                                email: string;
                                name: string;
                                phone: string;
                                createdAt: Date;
                                updatedAt: Date;
                                addressLine1: string;
                                addressLine2: string;
                                city: string;
                                pinCode: string;
                                latitude: number;
                                longitude: number;
                                timezone: string;
                                website: string;
                                coverImage: string;
                                logo: string;
                                commissionPercentage: number;
                                commissionFixed: number;
                                shiftAmount: number;
                                paidBreak: number;
                            };
                            shift: {
                                id: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                userId: string;
                                start: Date;
                                end: Date;
                                hourlyRate: number;
                                actualRate: number;
                                shiftAdId: number;
                                status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                                organizationSubBlockId: number;
                            };
                            user: {
                                id: string;
                                email: string;
                                firstName: string | null;
                                lastName: string | null;
                                phone: string | null;
                                avatar: string | null;
                                acitve: boolean;
                                isApproved: boolean;
                                deleted: boolean;
                                type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                                rating: number;
                                sex: string | null;
                                dob: Date | null;
                                lat: number | null;
                                lng: number | null;
                                internal: boolean;
                                approvedAt: Date | null;
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number | null;
                            };
                            payments: {
                                id: number;
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                userId: string;
                                status: "PENDING" | "CANCELLED" | "FAILED" | "PAID_BY_ORGANIZATION" | "PAID_BY_ADMIN";
                                paymentDate: Date | null;
                                timesheetId: number;
                                amount: number;
                                paidAmount: number;
                                invoiceId: string | null;
                                dueDate: Date;
                                releaseDate: Date | null;
                                releaseAmount: number;
                                paidBy: string | null;
                            }[];
                        }[];
                    };
                };
            };
        };
    } & {
        timesheet: {
            save: {
                put: {
                    body: {
                        reason?: string | undefined;
                        timesheetId: number;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            message: string;
                            varient: string;
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        updateTimesheet: {
            ":shiftJobId": {
                get: {
                    body: unknown;
                    params: {
                        shiftJobId: number;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            message: string;
                            status: number;
                            updatedJobs?: undefined;
                            updatedShiftAd?: undefined;
                            now?: undefined;
                        } | {
                            updatedJobs: {
                                id: number;
                                userId: string;
                                hourlyRate: number;
                                organizationId: number;
                                start: Date;
                                end: Date;
                                createdAt: Date;
                                updatedAt: Date;
                                actualRate: number;
                                shiftAdId: number;
                                status: "CANCELLED" | "COMPLETED" | "UNKNOWN" | "ASSIGNED" | "REASSIGNED" | "STARTED";
                                organizationSubBlockId: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                            }[];
                            updatedShiftAd: {
                                id: number;
                                title: string | null;
                                description: string | null;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                shiftStart: Date;
                                shiftEnd: Date;
                                hourlyRate: number;
                                userType: string[] | null;
                                vacancy: number;
                                status: "PENDING" | "APPROVED" | "REJECTED" | "MARKETPLACE" | "INVITATION_SENT_TO_PERMANENT_STAFF" | "INVITATION_SENT_TO_INTERNAL_STAFF" | "PRIVATE" | "CRITICAL" | "CANCELLED" | "COMPLETED" | "EXPIRED";
                                groupId: number | null;
                                applicationCount: number;
                                workflow: "DIRECT_TO_MARKETPLACE" | "INVITE_INTERNAL_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_INTERNAL_STAFF_THEN_MARKETPLACE" | "CLOSE_CALL" | "DIRECT_TO_USER" | "DIRECT_TO_INTERNAL_USER" | "FORCE_ASSIGN";
                                duration: number;
                                listingType: "INTERNAL" | "PUBLIC" | "PRIORITY";
                                postedById: string;
                                organizationId: number;
                                subBlockId: number;
                                createdAt: Date;
                                updatedAt: Date;
                                actualRate: number;
                            }[];
                            now: Date;
                            message?: undefined;
                            status?: undefined;
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        "test-voice-call": {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        message: string;
                    };
                };
            };
        };
    } & {
        "get-tasks": {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        tasks: {
                            id: number;
                            data: {
                                taskType: "SHIFT_PLAN_RETRY_CALL_TASK";
                                shiftAdId: number;
                                planId: number;
                                userId: string;
                                type: import("./db/schema/enums").ShiftPostingWorkflow;
                                plannedAt: Date;
                                updatedAt: Date;
                            } | {
                                taskType: "SHIFT_PLAN_CALL_TASK";
                                shiftAdId: number;
                                userId: string;
                                planId: number;
                                type: import("./db/schema/enums").ShiftPostingWorkflow;
                                plannedAt: Date;
                                updatedAt: Date;
                            } | {
                                taskType: "INTERNAL_STAFF_CALLOUT";
                                shiftAdId: number;
                                userId: string;
                                createdBy: string;
                                organizationId: number;
                            } | {
                                taskType: "SHIFT_AD_STATUS_UPDATE";
                                shiftAdId: number;
                                statusToUpdate: import("./db/schema/enums").ShiftAdStatus;
                                runTime: Date;
                                workflow: import("./db/schema/enums").ShiftPostingWorkflow;
                                shiftStart: Date;
                            } | {
                                taskType: "SHIFT_AD_TO_CLOSE_CALL";
                                shiftAdId: number;
                                runTime: Date;
                            } | {
                                taskType: "SHIFT_REMINDER";
                                shiftAdId: number;
                                plannedAt: Date;
                                updatedAt: Date;
                            } | {
                                taskType: "SHIFT_AD_CLOSE";
                                shiftAdId: number;
                                plannedAt: Date;
                            } | {
                                [key: string]: any;
                                taskType: undefined;
                            };
                            type: "SHIFT_AD_STATUS_UPDATE" | "INTERNAL_STAFF_CALLOUT" | "SHIFT_PLAN_CALL_TASK" | "SHIFT_PLAN_RETRY_CALL_TASK" | "SHIFT_AD_TO_CLOSE_CALL" | "SHIFT_REMINDER" | "SHIFT_AD_CLOSE";
                            createdAt: Date;
                            updatedAt: Date;
                            shiftAdId: number | null;
                            status: "PENDING" | "CANCELLED" | "ERRORED" | "RUNNING" | "FINISHED";
                            executor: string | null;
                            scheduledAt: Date;
                            shiftAd: {
                                title: string | null;
                                description: string | null;
                                duration: number;
                                id: number;
                                type: "DAY" | "NIGHT" | "DAY_(6:00AM-2:00PM)" | "DAY_(7:00AM-3:00PM)" | "DAY_(7:00AM-7:00PM)" | "AFTERNOON_(2:00PM-10:00PM)" | "AFTERNOON_(3:00PM-11:00PM)" | "NIGHT_(10:00PM-6:00AM)" | "NIGHT_(11:00PM-7:00AM)" | "NIGHT_(7:00PM-7:00AM)" | "CUSTOM";
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number;
                                hourlyRate: number;
                                actualRate: number;
                                shiftStart: Date;
                                shiftEnd: Date;
                                userType: string[] | null;
                                vacancy: number;
                                status: "PENDING" | "APPROVED" | "REJECTED" | "MARKETPLACE" | "INVITATION_SENT_TO_PERMANENT_STAFF" | "INVITATION_SENT_TO_INTERNAL_STAFF" | "PRIVATE" | "CRITICAL" | "CANCELLED" | "COMPLETED" | "EXPIRED";
                                groupId: number | null;
                                applicationCount: number;
                                workflow: "DIRECT_TO_MARKETPLACE" | "INVITE_INTERNAL_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_MARKETPLACE" | "INVITE_PERMANENT_STAFF_THEN_INTERNAL_STAFF_THEN_MARKETPLACE" | "CLOSE_CALL" | "DIRECT_TO_USER" | "DIRECT_TO_INTERNAL_USER" | "FORCE_ASSIGN";
                                listingType: "INTERNAL" | "PUBLIC" | "PRIORITY";
                                postedById: string;
                                subBlockId: number;
                            } | null;
                        }[];
                        now: Date;
                    };
                };
            };
        };
    } & {
        emailCheck: {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        message: string;
                        time: string;
                    };
                };
            };
        };
    };
} & {
    user: {
        availablity: {
            put: {
                body: {
                    start: Date;
                    end: Date;
                    available: boolean;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: "Availability updated";
                    400: "Date cannot be in past";
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    } & {
        availablity: {
            ":date": {
                get: {
                    body: unknown;
                    params: {
                        date: Date;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            start: Date;
                            end: Date;
                            available: boolean;
                            locked: boolean;
                        }[];
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        availability: {
            get: {
                body: unknown;
                params: {};
                query: {
                    from: string;
                    to: string;
                };
                headers: unknown;
                response: {
                    200: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        start: Date;
                        end: Date;
                        available: boolean;
                        locked: boolean;
                    }[];
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    user: {
        meta: {
            ":key": {
                get: {
                    body: unknown;
                    params: {
                        key: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            key: string;
                            value: import("./db/schema/enums").UserMetaValue | null;
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        meta: {
            ":key": {
                put: {
                    body: {
                        value: {
                            [x: string]: any;
                        };
                    };
                    params: {
                        key: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            key: string;
                            value: import("./db/schema/enums").UserMetaValue | null;
                        }[];
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        meta: {
            newLogin: {
                post: {
                    body: {
                        ip: string;
                        userAgent: string;
                        platform: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: void;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        documents: {
            get: {
                body: unknown;
                params: {};
                query: {
                    userId?: string | undefined;
                };
                headers: unknown;
                response: {
                    200: {
                        id: number;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        document: string;
                        expiry: Date | null;
                        fileName: string;
                        size: number;
                        otherDetails: Record<string, string> | null;
                        fileType: string;
                        approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
                    }[];
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    } & {
        document: {
            ":id": {
                get: {
                    body: unknown;
                    params: {
                        id: number;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            document: string;
                            expiry: Date | null;
                            fileName: string;
                            size: number;
                            otherDetails: Record<string, string> | null;
                            fileType: string;
                            approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        document: {
            ":id": {
                delete: {
                    body: unknown;
                    params: {
                        id: number;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: string;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        onboarding: {};
    } & {
        onboarding: {
            status: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            key: string;
                            value: import("./db/schema/enums").OnboardingMeta;
                            user: {
                                id: User;
                                type: User;
                            };
                        } | undefined;
                    };
                };
            };
        };
    } & {
        onboarding: {
            basicProfile: {
                post: {
                    body: {
                        firstName: string;
                        lastName: string;
                        phone: string;
                        sex: "male" | "female";
                        dob: Date;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: string;
                            email: string;
                            firstName: string | null;
                            lastName: string | null;
                            phone: string | null;
                            avatar: string | null;
                            acitve: boolean;
                            isApproved: boolean;
                            deleted: boolean;
                            type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                            rating: number;
                            sex: string | null;
                            dob: Date | null;
                            lat: number | null;
                            lng: number | null;
                            internal: boolean;
                            approvedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number | null;
                        }[];
                        404: "User not found";
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        onboarding: {
            addressDetails: {
                post: {
                    body: {
                        addressLine1: string;
                        addressLine2: string;
                        city: string;
                        pinCode: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: number;
                            userId: string;
                            addressLine1: string;
                            addressLine2: string;
                            city: string;
                            pinCode: string;
                            createdAt: Date;
                            updatedAt: Date;
                        }[];
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        onboarding: {
            profession: {
                post: {
                    body: {
                        category?: string | undefined;
                        type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: string;
                            email: string;
                            firstName: string | null;
                            lastName: string | null;
                            phone: string | null;
                            avatar: string | null;
                            acitve: boolean;
                            isApproved: boolean;
                            deleted: boolean;
                            type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                            rating: number;
                            sex: string | null;
                            dob: Date | null;
                            lat: number | null;
                            lng: number | null;
                            internal: boolean;
                            approvedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number | null;
                        }[];
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        onboarding: {
            location: {
                post: {
                    body: {
                        lat: number;
                        lng: number;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: string;
                            email: string;
                            firstName: string | null;
                            lastName: string | null;
                            phone: string | null;
                            avatar: string | null;
                            acitve: boolean;
                            isApproved: boolean;
                            deleted: boolean;
                            type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                            rating: number;
                            sex: string | null;
                            dob: Date | null;
                            lat: number | null;
                            lng: number | null;
                            internal: boolean;
                            approvedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number | null;
                        }[];
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        onboarding: {
            document: {
                post: {
                    body: {
                        expiry?: Date | undefined;
                        otherDetails?: {} | undefined;
                        url: string;
                        fileName: string;
                        size: number;
                        fileType: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            user: {
                                id: string;
                                email: string;
                                firstName: string | null;
                                lastName: string | null;
                                phone: string | null;
                                avatar: string | null;
                                acitve: boolean;
                                isApproved: boolean;
                                deleted: boolean;
                                type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                                rating: number;
                                sex: string | null;
                                dob: Date | null;
                                lat: number | null;
                                lng: number | null;
                                internal: boolean;
                                approvedAt: Date | null;
                                createdAt: Date;
                                updatedAt: Date;
                                organizationId: number | null;
                            };
                            document: {
                                id: number;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                document: string;
                                expiry: Date | null;
                                fileName: string;
                                size: number;
                                otherDetails: Record<string, string> | null;
                                fileType: string;
                                approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
                            }[];
                        };
                        404: "User not found";
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        onboarding: {
            upload: {
                post: {
                    body: {
                        name: string;
                        document: File;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            success: boolean;
                            url: string;
                            size: number;
                            name: string;
                            message: string;
                        } | {
                            success: boolean;
                            message: string;
                            url?: undefined;
                            size?: undefined;
                            name?: undefined;
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        onboarding: {
            upload64: {
                post: {
                    body: {
                        name: string;
                        document: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            success: boolean;
                            url: string;
                            size: number;
                            name: string;
                            message: string;
                        } | {
                            success: boolean;
                            message: string;
                            url?: undefined;
                            size?: undefined;
                            name?: undefined;
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    user: {
        updatepassword: {
            post: {
                body: {
                    currentPassword: string;
                    newPassword: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: "Password not match" | "Password Updated" | "Password Error" | undefined;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    } & {
        deleteaccount: {
            post: {
                body: {
                    password: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: "Password is invalid" | "Account deleted successfully" | "Error deleting account";
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    user: {
        "get-current-user": {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        id: string;
                        email: string;
                        firstName: string | null;
                        lastName: string | null;
                        phone: string | null;
                        avatar: string | null;
                        acitve: boolean;
                        isApproved: boolean;
                        deleted: boolean;
                        type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                        rating: number;
                        sex: string | null;
                        dob: Date | null;
                        lat: number | null;
                        lng: number | null;
                        internal: boolean;
                        approvedAt: Date | null;
                        createdAt: Date;
                        updatedAt: Date;
                        organizationId: number | null;
                        address: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            addressLine1: string;
                            addressLine2: string;
                            city: string;
                            pinCode: string;
                            userId: string;
                        };
                        statitics: {
                            userId: string;
                            totalShifts: number;
                            totalEarnings: number;
                            totalTime: number;
                            totalBreaks: number;
                            totalApplications: number;
                            totalCancellation: number;
                        };
                    } | {
                        statitics: {
                            userId: string;
                            totalShifts: number;
                            totalEarnings: number;
                            totalTime: number;
                            totalBreaks: number;
                            totalApplications: number;
                            totalCancellation: number;
                        };
                        address: null;
                        id: string;
                        email: string;
                        firstName: string | null;
                        lastName: string | null;
                        phone: string | null;
                        avatar: string | null;
                        acitve: boolean;
                        isApproved: boolean;
                        deleted: boolean;
                        type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                        rating: number;
                        sex: string | null;
                        dob: Date | null;
                        lat: number | null;
                        lng: number | null;
                        internal: boolean;
                        approvedAt: Date | null;
                        createdAt: Date;
                        updatedAt: Date;
                        organizationId: number | null;
                    } | undefined;
                    403: "You are not authorized to view this data #U";
                };
            };
        };
    } & {
        detailedUser: {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        id: string;
                        email: string;
                        firstName: string | null;
                        lastName: string | null;
                        phone: string | null;
                        avatar: string | null;
                        acitve: boolean;
                        isApproved: boolean;
                        deleted: boolean;
                        type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                        rating: number;
                        sex: string | null;
                        dob: Date | null;
                        lat: number | null;
                        lng: number | null;
                        internal: boolean;
                        approvedAt: Date | null;
                        createdAt: Date;
                        updatedAt: Date;
                        organizationId: number | null;
                        meta: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            key: string;
                            value: import("./db/schema/enums").UserMetaValue | null;
                        }[];
                        address: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            addressLine1: string;
                            addressLine2: string;
                            city: string;
                            pinCode: string;
                            userId: string;
                        };
                        bankDetails: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            accountNumber: string;
                            sortCode: string;
                        };
                        statitics: {
                            userId: string;
                            totalShifts: number;
                            totalEarnings: number;
                            totalTime: number;
                            totalBreaks: number;
                            totalApplications: number;
                            totalCancellation: number;
                        };
                        documents: {
                            id: number;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            document: string;
                            expiry: Date | null;
                            fileName: string;
                            size: number;
                            otherDetails: Record<string, string> | null;
                            fileType: string;
                            approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
                        }[];
                    } | undefined;
                };
            };
        };
    } & {
        single: {
            ":id": {
                get: {
                    body: unknown;
                    params: {
                        id: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: string;
                            email: string;
                            firstName: string | null;
                            lastName: string | null;
                            phone: string | null;
                            avatar: string | null;
                            type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                            rating: number;
                            approvedAt: Date | null;
                            organizationId: number | null;
                            statitics: {
                                userId: string;
                                totalShifts: number;
                                totalEarnings: number;
                                totalTime: number;
                                totalBreaks: number;
                                totalApplications: number;
                                totalCancellation: number;
                            };
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        detailed: {
            ":id": {
                get: {
                    body: unknown;
                    params: {
                        id: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            id: string;
                            email: string;
                            firstName: string | null;
                            lastName: string | null;
                            phone: string | null;
                            avatar: string | null;
                            acitve: boolean;
                            isApproved: boolean;
                            type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                            rating: number;
                            approvedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            organizationId: number | null;
                            statitics: {
                                userId: string;
                                totalShifts: number;
                                totalEarnings: number;
                                totalTime: number;
                                totalBreaks: number;
                                totalApplications: number;
                                totalCancellation: number;
                            };
                        } | undefined;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    } & {
        stats: {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        date: string;
                        avgHourlyRate: number;
                        totalBreakMinutes: number;
                        workHours: number;
                    }[];
                };
            };
        };
    };
} & {
    user: {
        ":userId": {
            get: {
                body: unknown;
                params: {
                    userId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        id: string;
                        email: string;
                        firstName: string | null;
                        lastName: string | null;
                        phone: string | null;
                        avatar: string | null;
                        isApproved: boolean;
                        type: "UNKNOWN" | "REGISTERED_NURSE" | "CARER" | "ORGANISATION_ADMIN" | "SYSTEM_ADMIN" | "REGISTERED_PRACTICAL_NURSE" | "DOCTOR_OF_SOCIAL_WORK" | "PERSONAL_SUPPORT_WORKER" | "INTERNAL_STAFF" | "DIETARY_AIDE";
                        approvedAt: Date | null;
                        createdAt: Date;
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
}>;
export type App = typeof app;
export {};
